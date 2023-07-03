import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InitialUserService } from './initial-user.service';

@Module({
  imports: [PrismaService],
  controllers: [],
  providers: [InitialUserService],
  exports: [],
})
export class InitialUserModule {}
