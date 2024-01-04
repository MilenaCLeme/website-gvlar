import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Prisma, User, Property } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPagePropertyDTO } from './dto/filter-page-property.dto';
import { PropertyAndOwnerService } from 'src/propertyandowner/propertyandowner.service';
import { shuffle } from 'lodash';
import { PhotographService } from 'src/photograph/photograph.service';

@Injectable()
export class PropertyService {
  private select = {
    id: true,
    about: true,
    business: true,
    iptu: true,
    rental: true,
    sell: true,
    description: true,
    footage: true,
    bathroom: true,
    bedroom: true,
    garage: true,
    city: true,
    state: true,
    area: true,
    photographs: true,
  };

  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => PropertyAndOwnerService))
    private readonly propertyAndOwner: PropertyAndOwnerService,
    @Inject(forwardRef(() => PhotographService))
    private readonly photoService: PhotographService,
  ) {}
  async list() {
    return await this.properties({
      include: {
        user: true,
        owners: {
          include: {
            owner: true,
          },
        },
        photographs: true,
      },
    });
  }

  async properties(params: Prisma.PropertyFindManyArgs): Promise<Property[]> {
    return await this.prisma.property.findMany(params);
  }

  async property(where: Prisma.PropertyWhereUniqueInput) {
    return await this.prisma.property.findUnique({
      where,
      include: {
        user: true,
        owners: {
          include: {
            owner: true,
          },
        },
        photographs: true,
      },
    });
  }

  async showSituation() {
    return await this.countProperty({
      OR: [
        { situation: { equals: 'em analise' } },
        { situation: { equals: 'solicitação de exclusão' } },
      ],
    });
  }

  async showId(id: number) {
    await this.exists(id);

    return await this.property({ id });
  }

  async create(createPropertie: Prisma.PropertyCreateInput, user: User) {
    return await this.prisma.property.create({
      data: {
        ...createPropertie,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
      include: {
        owners: {
          include: {
            owner: true,
          },
        },
        photographs: true,
        user: true,
      },
    });
  }

  async releaseAuth(propertyId: number, userId: number) {
    const property = await this.property({ id: propertyId });

    if (!(userId === property.register)) {
      throw new NotFoundException(`O usuario ${userId} não tem autorização`);
    }
  }

  async updateClient(
    idUser: number,
    id: number,
    data: Prisma.PropertyUpdateInput,
  ) {
    await this.exists(id);
    await this.releaseAuth(id, idUser);

    return await this.update(id, {
      ...data,
      published: false,
      situation: 'em analise',
    });
  }

  async update(id: number, data: Prisma.PropertyUpdateInput) {
    await this.exists(id);
    return await this.prisma.property.update({
      where: {
        id,
      },
      data,
      include: {
        owners: {
          include: {
            owner: true,
          },
        },
        photographs: true,
        user: true,
      },
    });
  }

  async updateRegisterForUserMaster(id: number) {
    try {
      const registerUser = await this.propertiesListClient(id);

      if (registerUser.length > 0) {
        registerUser.map(async ({ id }) => {
          await this.update(id, { user: { connect: { id: 1 } } });
        });
      }
    } catch (error) {
      new NotFoundException('Erro ao buscar propriedades do usuário');
    }
  }

  async delete(id: number) {
    await this.exists(id);
    await this.photoService.deletePhotoForProperty(id);
    await this.propertyAndOwner.deleteImmobile(id);
    return this.prisma.property.delete({
      where: {
        id,
      },
    });
  }

  async countProperty(where: Prisma.PropertyWhereInput): Promise<number> {
    return await this.prisma.property.count({
      where,
    });
  }

  async requestDelete(id: number, userId: number) {
    await this.exists(id);
    await this.releaseAuth(id, userId);

    return await this.update(id, {
      published: false,
      situation: 'solicitação de exclusão',
    });
  }

  async exists(id: number) {
    if (!(await this.countProperty({ id }))) {
      throw new NotFoundException(`O imóvel ${id} não existe`);
    }
  }

  async filter(page: number, data: FilterPagePropertyDTO) {
    try {
      const thisWhere: Prisma.PropertyWhereInput = this.createWhere(data);

      const pageSize = 25;

      const totalItems = await this.countProperty(thisWhere);

      const totalPages = Math.ceil(totalItems / pageSize); // Calcula o número total de páginas
      const maxSkip = Math.max((totalPages - 1) * pageSize, 0); // Calcula o número máximo de itens que podem ser pulados

      const skip = Math.min((page - 1) * pageSize, maxSkip);

      const order: Prisma.Enumerable<Prisma.PropertyOrderByWithRelationInput> =
        this.orderBy(data);

      const filteredItems = await this.properties({
        where: thisWhere,
        skip,
        take: pageSize,
        select: this.select,
        orderBy: order,
      });

      const nextPage = totalItems > page * pageSize ? page + 1 : false;

      const previousPage = page > 1 ? page - 1 : false;

      return {
        items: filteredItems,
        totalItems,
        nextPage,
        page,
        previousPage,
      };
    } catch (error) {
      new NotFoundException('Erro ao buscar propriedades');
    }
  }

  private orderBy(filters: FilterPagePropertyDTO) {
    if (filters.order && filters.business && !(filters.business === 'ambos')) {
      const name = filters.business === 'venda' ? 'sell' : 'rental';
      const order: Prisma.SortOrder =
        filters.order === 'Preço Menor' ? 'asc' : 'desc';
      return {
        [name]: order,
      };
    }

    if (filters.order) {
      const order: Prisma.SortOrder =
        filters.order === 'Preço Menor' ? 'asc' : 'desc';
      return {
        rental: order,
      };
    }

    return {};
  }

  private createWhere(filters: FilterPagePropertyDTO) {
    const or: Prisma.PropertyWhereInput[] = [];
    const and: Prisma.PropertyWhereInput[] = [{ published: { equals: true } }];

    if (filters.business && !(filters.business === 'ambos')) {
      and.push({
        business: {
          in: [filters.business, 'ambos'],
        },
      });
    }

    if (filters.about) {
      and.push({
        about: {
          equals: filters.about,
          mode: 'insensitive',
        },
      });
    }

    if (filters.text) {
      or.push(
        {
          zone: {
            contains: filters.text,
            mode: 'insensitive',
          },
        },
        {
          state: {
            contains: filters.text,
            mode: 'insensitive',
          },
        },
        {
          city: {
            contains: filters.text,
            mode: 'insensitive',
          },
        },
        {
          area: {
            contains: filters.text,
            mode: 'insensitive',
          },
        },
        {
          address: {
            contains: filters.text,
            mode: 'insensitive',
          },
        },
      );
    }

    if (filters.minV && filters.maxV) {
      const name = filters.business === 'venda' ? 'sell' : 'rental';
      and.push({
        [name]: {
          gte: filters.minV,
          lte: filters.maxV,
        },
      });
    } else if (filters.minV) {
      const name = filters.business === 'venda' ? 'sell' : 'rental';
      and.push({
        [name]: {
          gte: filters.minV,
        },
      });
    } else if (filters.maxV) {
      const name = filters.business === 'venda' ? 'sell' : 'rental';
      and.push({
        [name]: {
          lte: filters.maxV,
        },
      });
    }

    if (filters.minFoo && filters.maxFoo) {
      and.push(
        {
          footage: {
            gte: filters.minFoo,
          },
        },
        {
          footage: {
            lte: filters.maxFoo,
          },
        },
      );
    } else if (filters.minFoo) {
      and.push({
        footage: {
          gte: filters.minFoo,
        },
      });
    } else if (filters.maxFoo) {
      and.push({
        footage: {
          lte: filters.maxFoo,
        },
      });
    }

    if (filters.bathroom) {
      and.push({
        bathroom: { gte: filters.bathroom },
      });
    }

    if (filters.garage) {
      and.push({
        garage: { gte: filters.garage },
      });
    }

    if (filters.bedroom) {
      and.push({
        bedroom: { gte: filters.bedroom },
      });
    }

    return or.length === 0 ? { AND: and } : { OR: or, AND: and };
  }

  async pageProperty(id: number) {
    await this.exists(id);

    return await this.prisma.property.findFirst({
      where: {
        id,
        published: true,
      },
      select: this.select,
    });
  }

  async getRandomProperties() {
    try {
      const properties = await this.properties({
        where: {
          published: true,
        },
        select: this.select,
      });

      const suffledProperties = shuffle(properties);

      const randomProperties = suffledProperties.slice(0, 10);

      return randomProperties;
    } catch (error) {
      new NotFoundException('Erro ao buscar propriedades aleatórias');
    }
  }

  async propertiesListClient(id: number) {
    try {
      const properties = await this.properties({
        where: { register: id },
        include: {
          owners: {
            include: {
              owner: true,
            },
          },
          photographs: true,
          user: true,
        },
      });

      return properties;
    } catch (error) {
      new NotFoundException('Erro ao buscar propriedades');
    }
  }
}
