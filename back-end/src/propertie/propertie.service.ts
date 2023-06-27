import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { ImmobileOnOwnerService } from 'src/immobileOnOwner/immobileonowner.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPagePropertieDTO } from './dto/filter-page-propertie.dto';

@Injectable()
export class PropertieService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly propertieAndOwner: ImmobileOnOwnerService,
  ) {}
  async properties() {
    return await this.prisma.immobile.findMany({
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

  async propertie(where: Prisma.ImmobileWhereUniqueInput) {
    return await this.prisma.immobile.findUnique({
      where,
      select: {
        photographs: true,
      },
    });
  }

  async showId(id: number) {
    await this.exists(id);

    return await this.propertie({ id });
  }

  async create(createPropertie: Prisma.ImmobileCreateInput, user: User) {
    return await this.prisma.immobile.create({
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

  async update(id: number, data: Prisma.ImmobileUpdateInput) {
    await this.exists(id);
    return await this.prisma.immobile.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    await this.exists(id);
    await this.propertieAndOwner.deleteImmobile(id);
    return this.prisma.immobile.delete({
      where: {
        id,
      },
    });
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

  hasFilter(data: FilterPagePropertieDTO): boolean {
    return (
      (data.type !== undefined && data.type !== '') ||
      (data.text !== undefined && data.text !== '') ||
      (data.minV !== undefined && Number(data.minV) > 0) ||
      (data.maxV !== undefined && Number(data.maxV) > 0) ||
      (data.minFoo !== undefined && data.minFoo > 0) ||
      (data.maxFoo !== undefined && data.maxFoo > 0) ||
      (data.bathroom !== undefined && data.bathroom > 0) ||
      (data.vacancy !== undefined && data.vacancy > 0) ||
      (data.room !== undefined && data.room > 0)
    );
  }

  async pageWithFilter(page: number, data: FilterPagePropertieDTO) {
    const filtersOr: Prisma.ImmobileWhereInput[] = [
      { type: { equals: data.type } },
      { zone: { contains: data.text, mode: 'insensitive' } },
      { state: { contains: data.text, mode: 'insensitive' } },
      { city: { contains: data.text, mode: 'insensitive' } },
      { neighborhood: { contains: data.text, mode: 'insensitive' } },
      { address: { contains: data.text, mode: 'insensitive' } },
      { vsell: { gte: data.minV, lte: data.maxV } },
      { vboth: { gte: data.minV, lte: data.maxV } },
      { footage: { gte: data.maxFoo, lte: data.minFoo } },
      { bathroom: { gt: data.bathroom } },
      { vacancy: { gt: data.vacancy } },
      { room: { gt: data.room } },
    ];

    const filtersAnd = [{ published: { equals: true } }];

    const where: Prisma.ImmobileWhereInput = this.hasFilter(data)
      ? { OR: filtersOr, AND: filtersAnd }
      : { AND: filtersAnd };

    const pageSize = 20;
    const totalItems = await this.prisma.immobile.count({
      where,
    });

    const totalPages = Math.ceil(totalItems / pageSize); // Calcula o número total de páginas
    const maxSkip = Math.max((totalPages - 1) * pageSize, 0); // Calcula o número máximo de itens que podem ser pulados

    const skip = Math.min((page - 1) * pageSize, maxSkip);

    const filteredItems = await this.prisma.immobile.findMany({
      where,
      skip,
      take: pageSize,
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
}
