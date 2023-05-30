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
import { ImmobileService } from 'src/immobile/immobile.service';
import { UpdatePatchOwnerDTO } from './dto/update-patch-owner.dto';
import { ImmobileOnOwnerService } from 'src/immobileOnOwner/immobileonowner.service';

@Injectable()
export class OwnerService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => ImmobileService))
    private readonly immobileService: ImmobileService,
    @Inject(forwardRef(() => ImmobileOnOwnerService))
    private readonly immobileOnOwner: ImmobileOnOwnerService,
  ) {}

  async owner(
    userWhereUniqueInput: Prisma.OwnerWhereUniqueInput,
  ): Promise<Owner | null> {
    return await this.prisma.owner.findUnique({
      where: userWhereUniqueInput,
      include: {
        immobiles: {
          include: {
            immobile: true,
          },
        },
      },
    });
  }

  async list() {
    return await this.prisma.owner.findMany({
      include: {
        immobiles: {
          include: {
            immobile: true,
          },
        },
      },
    });
  }

  async showId(id: number) {
    await this.exists(id);
    return await this.owner({ id });
  }

  async create(create: CreateOwnerDTO) {
    try {
      await this.immobileService.exists(create.idImmobile);
      return await this.prisma.owner.create({
        data: {
          name: create.name,
          email: create.email,
          phone: create.phone,
          immobiles: {
            create: {
              immobile: {
                connect: {
                  id: create.idImmobile,
                },
              },
            },
          },
        },
        include: {
          immobiles: {
            include: {
              immobile: true,
              owner: true,
            },
          },
        },
      });
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
    await this.immobileOnOwner.deleteOwner(id);
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
}
