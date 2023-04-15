import { Body, Controller, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('users')
export class UserController {
  @Post()
  async createUser(@Body() body) {
    return { body };
  }

  @Get()
  async users() {
    return 'hello';
  }

  @Get()
  async userId() {
    return 'test';
  }

  @Post()
  async userEmail(@Body() body) {
    return { body };
  }

  @Put()
  async updateAll(@Body() body) {
    return { body };
  }
}
