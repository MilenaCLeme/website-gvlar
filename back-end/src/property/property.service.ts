import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User, Property } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPagePropertyDTO } from './dto/filter-page-property.dto';
import { PropertyAndOwnerService } from 'src/propertyandowner/propertyandowner.service';

@Injectable()
export class PropertyService {
  private select = {
    id: true,
    about: true,
    type: true,
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
    photographs: true,
  };

  constructor(
    private readonly prisma: PrismaService,
    private readonly propertyAndOwner: PropertyAndOwnerService,
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
    });
  }

  async delete(id: number) {
    await this.exists(id);
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

  hasFilter(data: FilterPagePropertyDTO): boolean {
    return (
      (data.type !== undefined && data.type !== '') ||
      (data.text !== undefined && data.text !== '') ||
      (data.minV !== undefined && Number(data.minV) > 0) ||
      (data.maxV !== undefined && Number(data.maxV) > 0) ||
      (data.minFoo !== undefined && data.minFoo > 0) ||
      (data.maxFoo !== undefined && data.maxFoo > 0) ||
      (data.bathroom !== undefined && data.bathroom > 0) ||
      (data.garage !== undefined && data.garage > 0) ||
      (data.bedroom !== undefined && data.bedroom > 0)
    );
  }

  async pageWithFilter(page: number, data: FilterPagePropertyDTO) {
    const filtersOr: Prisma.PropertyWhereInput[] = [
      { type: { equals: data.type, mode: 'insensitive' } },
      { zone: { contains: data.text, mode: 'insensitive' } },
      { state: { contains: data.text, mode: 'insensitive' } },
      { city: { contains: data.text, mode: 'insensitive' } },
      { area: { contains: data.text, mode: 'insensitive' } },
      { address: { contains: data.text, mode: 'insensitive' } },
      { sell: { gte: data.minV, lte: data.maxV } },
      { rental: { gte: data.minV, lte: data.maxV } },
      { footage: { gte: data.maxFoo, lte: data.minFoo } },
      { bathroom: { gt: data.bathroom } },
      { garage: { gt: data.garage } },
      { bedroom: { gt: data.bedroom } },
    ];

    const filtersAnd = [{ published: { equals: true } }];

    const where: Prisma.PropertyWhereInput = this.hasFilter(data)
      ? { OR: filtersOr, AND: filtersAnd }
      : { AND: filtersAnd };

    const pageSize = 20;
    const totalItems = await this.countProperty(where);

    const totalPages = Math.ceil(totalItems / pageSize); // Calcula o número total de páginas
    const maxSkip = Math.max((totalPages - 1) * pageSize, 0); // Calcula o número máximo de itens que podem ser pulados

    const skip = Math.min((page - 1) * pageSize, maxSkip);

    const filteredItems = await this.properties({
      where,
      skip,
      take: pageSize,
      select: this.select,
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
  }

  async pageProperty(id: number) {
    await this.exists(id);

    return await this.prisma.property.findFirst({
      where: {
        id,
      },
      select: this.select,
    });
  }

  async getRandomProperties() {
    try {
      const where: Prisma.PropertyWhereInput = {
        AND: [{ published: { equals: true } }],
      };

      const count = await this.prisma.property.count({ where });

      console.log(count);

      const randomIndexes = [];
      while (randomIndexes.length < 10) {
        const randomIndex = Math.floor(Math.random() * count) + 1;
        if (!randomIndexes.includes(randomIndex)) {
          randomIndexes.push(randomIndex);
        }
      }

      const randomProperties = await this.properties({
        where: {
          id: {
            in: randomIndexes,
          },
        },
        select: this.select,
      });

      return randomProperties;
    } catch (error) {
      throw new NotFoundException('Erro ao buscar propriedades aleatórias');
    }
  }
}
