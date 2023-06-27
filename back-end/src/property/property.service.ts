import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilterPagePropertyDTO } from './dto/filter-page-property.dto';
import { PropertyAndOwnerService } from 'src/propertyandowner/propertyandowner.service';

@Injectable()
export class PropertyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly propertyAndOwner: PropertyAndOwnerService,
  ) {}
  async properties() {
    return await this.prisma.property.findMany({
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

  async exists(id: number) {
    if (
      !(await this.prisma.property.count({
        where: {
          id,
        },
      }))
    ) {
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
      { type: { equals: data.type } },
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
    const totalItems = await this.prisma.property.count({
      where,
    });

    const totalPages = Math.ceil(totalItems / pageSize); // Calcula o número total de páginas
    const maxSkip = Math.max((totalPages - 1) * pageSize, 0); // Calcula o número máximo de itens que podem ser pulados

    const skip = Math.min((page - 1) * pageSize, maxSkip);

    const filteredItems = await this.prisma.property.findMany({
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
