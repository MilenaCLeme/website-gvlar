import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ImmobileService {
  constructor(private readonly prisma: PrismaService) {}
  async immobiles() {
    return await this.prisma.immobile.findMany({
      include: {
        user: true,
        owners: true,
        photographs: true,
      },
    });
  }

  async immobile(where: Prisma.ImmobileWhereUniqueInput) {
    await this.exists(where.id);

    return await this.prisma.immobile.findUnique({
      where,
    });
  }

  async showId(id: number) {
    await this.exists(id);

    return await this.immobile({ id });
  }

  async create(createImmobile: Prisma.ImmobileCreateInput, user: User) {
    return await this.prisma.immobile.create({
      data: {
        ...createImmobile,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  }

  async update(id: number) {
    return id;
  }

  async delete(id: number) {
    return id;
  }

  async exists(id: number) {
    if (
      !(await this.prisma.immobile.count({
        where: {
          id,
        },
      }))
    ) {
      throw new NotFoundException(`O imóvel ${id} não existe`);
    }
  }
}
