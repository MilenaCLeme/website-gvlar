import { Module, forwardRef } from '@nestjs/common';
import { ImmobileOnOwnerService } from './immobileonowner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImmobileOnOwnerController } from './immobileonowner.controller';
import { ImmobileModule } from 'src/immobile/immobile.module';
import { OwnerModule } from 'src/owner/owner.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => ImmobileModule),
    forwardRef(() => OwnerModule),
  ],
  controllers: [ImmobileOnOwnerController],
  providers: [ImmobileOnOwnerService],
  exports: [ImmobileOnOwnerService],
})
export class ImmobileOnOwnerModule {}
