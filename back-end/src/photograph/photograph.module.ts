import { Module, forwardRef } from '@nestjs/common';
import { PhotographController } from './photograph.controller';
import { PhotographService } from './photograph.service';
import { FileModule } from '../file/file.module';
import { PropertyModule } from '../property/property.module';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => AuthModule),
    forwardRef(() => FileModule),
    forwardRef(() => PropertyModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PhotographController],
  providers: [PhotographService],
  exports: [PhotographService],
})
export class PhotographModule {}
