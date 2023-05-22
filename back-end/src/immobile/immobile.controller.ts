import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ImmobileService } from './immobile.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateImmobileDTO } from './dto/create-immobile.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserType } from '@prisma/client';

@UseGuards(AuthGuard)
@Controller('immobile')
export class ImmobileController {
  constructor(private readonly immobileService: ImmobileService) {}

  @Post()
  async create(@Body() data: CreateImmobileDTO, @User() user: UserType) {
    return await this.immobileService.create(data, user);
  }

  @Get()
  async list() {
    return await this.immobileService.immobiles();
  }

  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.immobileService.showId(id);
  }

  @Put('id')
  async update(@ParamId() id: number) {
    return await this.immobileService.update(id);
  }

  @Patch('id')
  async updatePartial(@ParamId() id: number) {
    return await this.immobileService.update(id);
  }

  @Delete('id')
  async delete(@ParamId() id: number) {
    return await this.immobileService.delete(id);
  }
}
