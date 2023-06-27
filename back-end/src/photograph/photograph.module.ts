import { Module, forwardRef } from '@nestjs/common';
import { PhotographController } from './photograph.controller';
import { PhotographService } from './photograph.service';
import { FileModule } from 'src/file/file.module';
import { PropertyModule } from 'src/property/property.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    forwardRef(() => PrismaModule),
    forwardRef(() => FileModule),
    forwardRef(() => PropertyModule),
  ],
  controllers: [PhotographController],
  providers: [PhotographService],
  exports: [PhotographService],
})
export class PhotographModule {}
