import { Module, forwardRef } from '@nestjs/common';
import { PropertyController } from './property.controller';
import { PropertyService } from './property.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { PropertyAndOwnerModule } from 'src/propertyandowner/propertyandowner.module';
import { PhotographModule } from 'src/photograph/photograph.module';

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
