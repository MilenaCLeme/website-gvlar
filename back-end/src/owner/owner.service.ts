import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { Owner, Prisma } from '@prisma/client';
import { PropertyService } from 'src/property/property.service';
import { UpdatePatchOwnerDTO } from './dto/update-patch-owner.dto';
import { PropertyAndOwnerService } from 'src/propertyandowner/propertyandowner.service';

@Injectable()
export class OwnerService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => PropertyService))
    private readonly propertyService: PropertyService,
    @Inject(forwardRef(() => PropertyAndOwnerService))
    private readonly propertyAndOwner: PropertyAndOwnerService,
  ) {}

  async owner(
    userWhereUniqueInput: Prisma.OwnerWhereUniqueInput,
  ): Promise<Owner | null> {
    return await this.prisma.owner.findUnique({
      where: userWhereUniqueInput,
      include: {
        properties: {
          include: {
            property: true,
          },
        },
      },
    });
  }

  async list() {
    return await this.prisma.owner.findMany({
      include: {
        properties: {
          include: {
            property: true,
          },
        },
      },
    });
  }
  /*
  async showEmail(email: string) {
    await this.existsEmail(email);
    return await this.owner({ email });
  }

  */
  async showId(id: number) {
    await this.exists(id);
    return await this.owner({ id });
  }

  async create(create: CreateOwnerDTO) {
    try {
      await this.propertyService.exists(create.propertyId);

      await this.prisma.owner.create({
        data: {
          name: create.name,
          email: create.email,
          phone: create.phone,
          properties: {
            create: {
              property: {
                connect: {
                  id: create.propertyId,
                },
              },
            },
          },
        },
      });

      return await this.propertyService.property({ id: create.propertyId });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'O e-mail já está em uso. Por favor, pesquisar o e-mail para localizar usuario.',
        );
      }
      throw new InternalServerErrorException(
        'Ocorreu um erro inesperado ao cadastrar',
      );
    }
  }

  async update(id: number, update: UpdatePatchOwnerDTO) {
    const { email, name, phone } = update;
    await this.exists(id);
    return await this.prisma.owner.update({
      where: {
        id,
      },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone && { phone }),
      },
    });
  }

  async detele(id: number) {
    await this.exists(id);
    await this.propertyAndOwner.deleteOwner(id);
    return await this.prisma.owner.delete({
      where: {
        id,
      },
    });
  }

  async exists(id: number) {
    if (
      !(await this.prisma.owner.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O ${id} não existe`);
    }
  }

  async existsEmail(email: string) {
    if (
      !(await this.prisma.owner.count({
        where: {
          email,
        },
      }))
    ) {
      throw new NotFoundException(`O ${email} não existe`);
    }
  }
}
