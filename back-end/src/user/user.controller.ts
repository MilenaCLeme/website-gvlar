import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { ShowEmailUserDTO } from './dto/show-email-get-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDTO) {
    return { body };
  }

  @Get()
  async list() {
    return { users: [] };
  }

  @Get(':id')
  async showId(@Param() params) {
    return { user: {}, params };
  }

  @Post()
  async showEmail(@Body() body: ShowEmailUserDTO) {
    return { user: {}, body };
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @Param() params) {
    return { body, params };
  }

  @Patch(':id')
  async updatePartial(@Body() body: UpdatePatchUserDTO, @Param() params) {
    return { body, params };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return { params };
  }
}
