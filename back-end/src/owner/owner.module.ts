import { Module, forwardRef } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PropertyModule } from 'src/property/property.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PropertyAndOwnerModule } from 'src/propertyandowner/propertyandowner.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => PropertyModule),
    forwardRef(() => PropertyAndOwnerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
