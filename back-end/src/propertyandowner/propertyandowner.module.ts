import { Module, forwardRef } from '@nestjs/common';
import { PropertyAndOwnerService } from './propertyandowner.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PropertyAndOwnerController } from './propertyandowner.controller';
import { PropertyModule } from 'src/property/property.module';
import { OwnerModule } from 'src/owner/owner.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

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
