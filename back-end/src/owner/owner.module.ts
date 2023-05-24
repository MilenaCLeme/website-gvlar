import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
