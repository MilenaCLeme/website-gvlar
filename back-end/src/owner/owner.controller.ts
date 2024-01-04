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
import { OwnerService } from './owner.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { CreateOwnerDTO } from './dto/create-owner.dto';
import { UpdatePatchOwnerDTO } from './dto/update-patch-owner.dto';
import { UpdatePutOwnerDTO } from './dto/update-put-owner.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Roles(Role.master)
  @Get()
  async list() {
    return await this.ownerService.list();
  }

  @Roles(Role.master, Role.worker)
  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.ownerService.showId(id);
  }
  /*
  @Roles(Role.master, Role.worker)
  @Post('email/verification')
  async showEmail(@Body('email') email: string) {
    return await this.ownerService.showEmail(email);
  }
  */
  @Roles(Role.master, Role.worker)
  @Post()
  async create(@Body() data: CreateOwnerDTO) {
    return await this.ownerService.create(data);
  }

  @Roles(Role.master, Role.worker)
  @Put(':id')
  async update(@ParamId() id: number, @Body() data: UpdatePatchOwnerDTO) {
    return await this.ownerService.update(id, data);
  }

  @Roles(Role.master, Role.worker)
  @Patch(':id')
  async updatePartial(@ParamId() id: number, @Body() data: UpdatePutOwnerDTO) {
    return await this.ownerService.update(id, data);
  }

  @Roles(Role.master, Role.worker)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.ownerService.detele(id);
  }
}
