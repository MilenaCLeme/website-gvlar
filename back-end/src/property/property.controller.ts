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
import { PropertyService } from './property.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreatePropertyDTO } from './dto/create-property.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { User as UserType } from '@prisma/client';
import { UpdatePutPropertyDTO } from './dto/update-put-property.dto';
import { UpdatePatchPropertyDTO } from './dto/update-patch-property.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateForTheClientPropertyDTO } from './dto/create-fortheclient-property.dto';
import { UpdatePatchForTheClientPropertyDTO } from './dto/update-patch-fortheclient-property.dto';
import { FilterPagePropertyDTO } from './dto/filter-page-property.dto';

@UseInterceptors(LogInterceptor)
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Post()
  async create(@Body() data: CreatePropertyDTO, @User() user: UserType) {
    return await this.propertyService.create(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Get()
  async list() {
    return await this.propertyService.list();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.propertyService.showId(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdatePutPropertyDTO) {
    return await this.propertyService.update(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Patch(':id')
  async updatePartial(
    @ParamId() id: number,
    @Body() data: UpdatePatchPropertyDTO,
  ) {
    return await this.propertyService.update(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.propertyService.delete(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client, Role.worker)
  @Post('fortheclient')
  async createPropertieForTheClient(
    @Body() data: CreateForTheClientPropertyDTO,
    @User() user: UserType,
  ) {
    return await this.propertyService.create(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client, Role.worker)
  @Patch('fortheclient/:id')
  async updatePropertieForTheClient(
    @User('id') userId: number,
    @ParamId() id: number,
    @Body() data: UpdatePatchForTheClientPropertyDTO,
  ) {
    return await this.propertyService.updateClient(userId, id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client, Role.worker)
  @Delete('fortheclient/:id')
  async requestDelete(@ParamId() id: number, @User('id') userId: number) {
    return await this.propertyService.requestDelete(id, userId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.client, Role.worker)
  @Get('list/client')
  async listPropertyClient(@User() user: UserType) {
    return await this.propertyService.propertiesListClient(user.id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Get('list/client/:id')
  async listPropertyClientIDClient(@ParamId() id: number) {
    return await this.propertyService.propertiesListClient(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.master, Role.worker)
  @Get('situation/count')
  async showSituation() {
    return await this.propertyService.showSituation();
  }

  @Post('pagewithfilter/:id')
  async pageWithFilter(
    @ParamId() id: number,
    @Body() data: FilterPagePropertyDTO,
  ) {
    return await this.propertyService.filter(id, data);
  }

  @Get('random/list')
  async getRandomProperties() {
    return await this.propertyService.getRandomProperties();
  }

  @Get('pageproperty/:id')
  async pageProperty(@ParamId() id: number) {
    return await this.propertyService.pageProperty(id);
  }
}
