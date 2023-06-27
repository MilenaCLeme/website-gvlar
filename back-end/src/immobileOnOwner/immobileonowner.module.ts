import { Module, forwardRef } from '@nestjs/common';
import { ImmobileOnOwnerService } from './immobileonowner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ImmobileOnOwnerController } from './immobileonowner.controller';
import { ImmobileModule } from 'src/propertie/immobile.module';
import { OwnerModule } from 'src/owner/owner.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => ImmobileModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ImmobileOnOwnerController],
  providers: [ImmobileOnOwnerService],
  exports: [ImmobileOnOwnerService],
})
export class ImmobileOnOwnerModule {}
