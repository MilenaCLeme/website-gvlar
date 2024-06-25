import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PropertyAndOwnerService } from './propertyandowner.service';
import { DeletePropertyAndOwnerDTO } from './dto/delete-propertyandowner.dto';
import { InsertPropertyAndOwnerDTO } from './dto/insert-propertyandowner.dto';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '../guards/role.guard';
import { Roles } from '../decorators/roles.decorator';
import { Role } from '../enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('propertyandowner')
export class PropertyAndOwnerController {
  constructor(
    private readonly propertyAndOwnerService: PropertyAndOwnerService,
  ) {}

  @Roles(Role.master)
  @Post('delete')
  async delete(@Body() data: DeletePropertyAndOwnerDTO) {
    return await this.propertyAndOwnerService.delete(data);
  }

  @Roles(Role.master, Role.worker)
  @Post('insert')
  async insert(@Body() data: InsertPropertyAndOwnerDTO) {
    return await this.propertyAndOwnerService.insert(data);
  }
}
