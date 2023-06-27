import {
  Body,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ImmobileOnOwnerService } from './immobileonowner.service';
import { DeleteImmobileOnOwnerDTO } from './dto/delete-immobileonowner.dto';
import { InsertImmobileOnOwnerDTO } from './dto/insert-immobileonowner.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('immobileonowner')
export class ImmobileOnOwnerController {
  constructor(
    private readonly immobileOnOwnerService: ImmobileOnOwnerService,
  ) {}

  @Roles(Role.master)
  @Post('delete')
  async delete(@Body() data: DeleteImmobileOnOwnerDTO) {
    return await this.immobileOnOwnerService.delete(data);
  }

  @Roles(Role.master, Role.worker)
  @Post('insert')
  async insert(@Body() data: InsertImmobileOnOwnerDTO) {
    return await this.immobileOnOwnerService.insert(data);
  }
}
