import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateOwnerDTO } from './dto/create-owner.dto';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Get()
  async list() {
    return await this.ownerService.list();
  }

  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.ownerService.showId(id);
  }

  @Post()
  async create(@Body() data: CreateOwnerDTO) {
    return await this.ownerService.create(data);
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() data) {
    return await this.ownerService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@ParamId() id: number, @Body() data) {
    return await this.ownerService.update(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.ownerService.detele(id);
  }
}
