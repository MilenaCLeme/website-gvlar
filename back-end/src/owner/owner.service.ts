import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateOwnerDTO } from './dto/create-owner.dto';

@Injectable()
export class OwnerService {
  constructor(private readonly prisma: PrismaService) {}
  async list() {
    return [];
  }

  async showId(id: number) {
    return id;
  }

  async create(createOwner: CreateOwnerDTO) {
    return await this.prisma.owner.create({
      data: {
        name: createOwner.name,
        email: createOwner.email,
        phone: createOwner.phone,
        immobiles: {
          create: {
            immobile: {
              connect: {
                id: createOwner.idImmobile,
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
  }

  async update(id: number, data) {
    return { id, data };
  }

  async detele(id: number) {
    return { id };
  }
}
