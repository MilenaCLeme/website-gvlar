import { Module, forwardRef } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyModule } from '../property/property.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PropertyAndOwnerModule } from '../propertyandowner/propertyandowner.module';

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
