import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { DeleteImmobileOnOwnerDTO } from './dto/delete-immobileonowner.dto';
import { InsertImmobileOnOwnerDTO } from './dto/insert-immobileonowner.dto';
import { OwnerService } from 'src/owner/owner.service';
import { ImmobileService } from 'src/propertie/immobile.service';

@Injectable()
export class ImmobileOnOwnerService {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => OwnerService))
    private readonly owner: OwnerService,
    @Inject(forwardRef(() => ImmobileService))
    private readonly immobile: ImmobileService,
  ) {}

  async deleteOwner(id: number) {
    await this.prisma.immobileOnOwner.deleteMany({
      where: {
        ownerId: id,
      },
    });
  }

  async delete(immobileId_ownerId: DeleteImmobileOnOwnerDTO) {
    await this.immobile.exists(immobileId_ownerId.immobileId);
    await this.owner.exists(immobileId_ownerId.ownerId);
    return this.prisma.immobileOnOwner.delete({
      where: {
        immobileId_ownerId,
      },
    });
  }

  async insert(data: InsertImmobileOnOwnerDTO) {
    await this.immobile.exists(data.immobileId);
    await this.owner.exists(data.ownerId);
    return await this.prisma.immobileOnOwner.create({
      data,
    });
  }

  async deleteImmobile(id: number) {
    await this.prisma.immobileOnOwner.deleteMany({
      where: {
        immobileId: id,
      },
    });
  }
}
