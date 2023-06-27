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
import { PropertieService } from './propertie.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreatePropertieDTO } from './dto/create-propertie.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserType } from '@prisma/client';
import { UpdatePutPropertieDTO } from './dto/update-put-user.dto';
import { UpdatePatchPropertieDTO } from './dto/update-patch-propertie.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateForTheClientPropertieDTO } from './dto/create-fortheclient-propertie.dto';
import { UpdatePatchForTheClientPropertieDTO } from './dto/update-patch-fortheclient-propertie.dto';
import { FilterPagePropertieDTO } from './dto/filter-page-propertie.dto';

@UseInterceptors(LogInterceptor)
@Controller('propertie')
export class PropertieController {
  constructor(private readonly propertieService: PropertieService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Post()
  async create(@Body() data: CreatePropertieDTO, @User() user: UserType) {
    return await this.propertieService.create(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master)
  @Get()
  async list() {
    return await this.propertieService.properties();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.propertieService.showId(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdatePutPropertieDTO) {
    return await this.propertieService.update(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Patch(':id')
  async updatePartial(
    @ParamId() id: number,
    @Body() data: UpdatePatchPropertieDTO,
  ) {
    return await this.propertieService.update(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.propertieService.delete(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client)
  @Post('fortheclient')
  async createPropertieForTheClient(
    @Body() data: CreateForTheClientPropertieDTO,
    @User() user: UserType,
  ) {
    return await this.propertieService.create(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client)
  @Put('fortheclient/:id')
  async updatePropertieForTheClient(
    @ParamId() id: number,
    @Body() data: UpdatePatchForTheClientPropertieDTO,
  ) {
    return await this.propertieService.update(id, data);
  }

  @Post('pagewithfilter/:id')
  async pageWithFilter(
    @ParamId() id: number,
    @Body() data: FilterPagePropertieDTO,
  ) {
    return await this.propertieService.pageWithFilter(id, data);
  }
}
