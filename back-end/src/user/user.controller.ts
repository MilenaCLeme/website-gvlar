import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ShowEmailUserDTO } from './dto/show-email-get-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UserService } from './user.service';

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
  async showId(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.user({ id });
  }

  @Post('email')
  async showEmail(@Body() email: ShowEmailUserDTO) {
    return await this.userService.user(email);
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.updateUser(id, body);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.deleteUser(id);
  }
}
