import { Module, forwardRef } from '@nestjs/common';
import { PropertyAndOwnerService } from './propertyandowner.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PropertyAndOwnerController } from './propertyandowner.controller';
import { PropertyModule } from '../property/property.module';
import { OwnerModule } from '../owner/owner.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => PropertyModule),
    forwardRef(() => OwnerModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PropertyAndOwnerController],
  providers: [PropertyAndOwnerService],
  exports: [PropertyAndOwnerService],
})
export class PropertyAndOwnerModule {}
