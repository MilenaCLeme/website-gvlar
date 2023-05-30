import { Module, forwardRef } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImmobileModule } from 'src/immobile/immobile.module';
import { ImmobileOnOwnerModule } from 'src/immobileOnOwner/immobileonowner.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => ImmobileModule),
    forwardRef(() => ImmobileOnOwnerModule),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
