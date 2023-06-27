import { Module, forwardRef } from '@nestjs/common';
import { PropertieController } from './propertie.controller';
import { PropertieService } from './propertie.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ImmobileOnOwnerModule } from 'src/immobileOnOwner/immobileonowner.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => ImmobileOnOwnerModule),
  ],
  controllers: [PropertieController],
  providers: [PropertieService],
  exports: [PropertieService],
})
export class PropertieModule {}
