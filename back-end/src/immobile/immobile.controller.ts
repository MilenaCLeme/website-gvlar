import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImmobileService } from './immobile.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateImmobileDTO } from './dto/create-immobile.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserType } from '@prisma/client';
import { UpdatePutImmobileDTO } from './dto/update-put-user.dto';
import { UpdatePatchImmobileDTO } from './dto/update-patch-immobile.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('immobiles')
export class ImmobileController {
  constructor(private readonly immobileService: ImmobileService) {}

  @Roles(Role.master, Role.worker)
  @Post()
  async create(@Body() data: CreateImmobileDTO, @User() user: UserType) {
    return await this.immobileService.create(data, user);
  }

  @Roles(Role.master)
  @Get()
  async list() {
    return await this.immobileService.immobiles();
  }

  @Roles(Role.master, Role.worker)
  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.immobileService.showId(id);
  }

  @Roles(Role.master, Role.worker)
  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdatePutImmobileDTO) {
    return await this.immobileService.update(id, data);
  }

  @Roles(Role.master, Role.worker)
  @Patch(':id')
  async updatePartial(
    @ParamId() id: number,
    @Body() data: UpdatePatchImmobileDTO,
  ) {
    return await this.immobileService.update(id, data);
  }

  @Roles(Role.master)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.immobileService.delete(id);
  }
}
