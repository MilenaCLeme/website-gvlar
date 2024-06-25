import { Module, forwardRef } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import { PropertyAndOwnerModule } from '../propertyandowner/propertyandowner.module';
import { PhotographModule } from '../photograph/photograph.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => UserModule),
    forwardRef(() => PropertyAndOwnerModule),
    forwardRef(() => PhotographModule),
  ],
  controllers: [PropertyController],
  providers: [PropertyService],
  exports: [PropertyService],
})
export class PropertyModule {}
