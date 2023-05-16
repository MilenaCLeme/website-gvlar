import { Module } from '@nestjs/common';
import { ImmobileController } from './immobile.controller';
import { ImmobileService } from './immobile.service';

@Module({
  imports: [],
  controllers: [ImmobileController],
  providers: [ImmobileService],
  exports: [],
})
export class ImmobileModule {}
