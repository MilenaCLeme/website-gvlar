import { Module, forwardRef } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImmobileModule } from 'src/propertie/immobile.module';
import { ImmobileOnOwnerModule } from 'src/immobileOnOwner/immobileonowner.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => ImmobileModule),
    forwardRef(() => ImmobileOnOwnerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
