import { Module, forwardRef } from '@nestjs/common';
import { ImmobileController } from './immobile.controller';
import { ImmobileService } from './immobile.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ImmobileController],
  providers: [ImmobileService],
  exports: [ImmobileService],
})
export class ImmobileModule {}
