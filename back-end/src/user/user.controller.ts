import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';
import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Get()
  async list() {
    return await this.userService.listUsers();
  }

  @Get(':id')
  async showId(@ParamId() id: number) {
    return await this.userService.showId(id);
  }

  @Post('email/verification')
  async showEmail(@Body('email') email: string) {
    return await this.userService.showEmail(email);
  }

  @Put(':id')
  async update(@ParamId() id: number, @Body() body: UpdatePutUserDTO) {
    return await this.userService.updateUser(id, body);
  }

  @Patch(':id')
  async updatePartial(@ParamId() id: number, @Body() body: UpdatePatchUserDTO) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return await this.userService.deleteUser(id);
  }
}
