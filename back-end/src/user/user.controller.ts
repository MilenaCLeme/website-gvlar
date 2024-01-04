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
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enums/role.enum';

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.master)
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Roles(Role.master, Role.worker)
  @Get()
  async list() {
    return await this.userService.listUsers();
  }

  @Roles(Role.master)
  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.userService.showId(id);
  }

  @Roles(Role.master, Role.worker)
  @Post('email/verification')
  async showEmail(@Body('email') email: string) {
    return await this.userService.showEmail(email);
  }

  @Roles(Role.master)
  @Put(':id')
  async update(@ParamId() id: number, @Body() body: UpdatePutUserDTO) {
    return await this.userService.updateUser(id, body);
  }

  @Roles(Role.master, Role.worker)
  @Patch(':id')
  async updatePartial(@ParamId() id: number, @Body() body: UpdatePatchUserDTO) {
    return await this.userService.updateUser(id, body);
  }

  @Roles(Role.master)
  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.deleteUser(id);
  }
}
