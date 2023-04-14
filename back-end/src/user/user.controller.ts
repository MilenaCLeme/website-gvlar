import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Post()
  createUser() {
    return 'hello';
  }

  @Get()
  users() {
    return 'hello';
  }

  @Get()
  userId() {
    return 'test';
  }
}
