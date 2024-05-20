import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { DeletePropertyAndOwnerDTO } from './dto/delete-propertyandowner.dto';
import { InsertPropertyAndOwnerDTO } from './dto/insert-propertyandowner.dto';
import { PrismaService } from '../prisma/prisma.service';
import { OwnerService } from '../owner/owner.service';
import { PropertyService } from '../property/property.service';

@Injectable()
export class PropertyAndOwnerService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => OwnerService))
    private readonly owner: OwnerService,
    @Inject(forwardRef(() => PropertyService))
    private readonly property: PropertyService,
  ) {}

  async deleteOwner(id: number) {
    await this.prisma.propertyAndOwner.deleteMany({
      where: {
        ownerId: id,
      },
    });
  }

  async delete(propertyId_ownerId: DeletePropertyAndOwnerDTO) {
    await this.property.exists(propertyId_ownerId.propertyId);
    await this.owner.exists(propertyId_ownerId.ownerId);
    return this.prisma.propertyAndOwner.delete({
      where: {
        propertyId_ownerId,
      },
    });
  }

  async insert(data: InsertPropertyAndOwnerDTO) {
    await this.property.exists(data.propertyId);
    await this.owner.exists(data.ownerId);
    return await this.prisma.propertyAndOwner.create({
      data,
    });
  }

  async deleteImmobile(id: number) {
    await this.prisma.propertyAndOwner.deleteMany({
      where: {
        propertyId: id,
      },
    });
  }
}
