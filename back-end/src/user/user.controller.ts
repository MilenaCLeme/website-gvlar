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
  async showId(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id };
  }

  @Post('email')
  async showEmail(@Body() body: ShowEmailUserDTO) {
    return { user: {}, body };
  }

  @Put(':id')
  async update(
    @Body() body: UpdatePutUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { body, id };
  }

  @Patch(':id')
  async updatePartial(
    @Body() body: UpdatePatchUserDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return { body, id };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return { id };
  }
}
