import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { AuthValidateDTO } from './dto/auth-validate.dto';
import { AuthUpdatePatchRegisterDTO } from './dto/auth-update-patch-register.dto';
import { Throttle } from '@nestjs/throttler';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { User as UserType } from '@prisma/client';
import { ParamId } from 'src/decorators/param-id.decorator';
import { AuthChangeDTO } from './dto/auth-change.dto';

@UseInterceptors(LogInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard)
  @Get('check-token')
  async checkTokenValidity(@User() user: UserType) {
    return this.authService.checkTokenValidity(user);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@User() user: UserType) {
    return this.authService.logout(user);
  }

  @UseGuards(AuthGuard)
  @Patch('register')
  async registerUpdate(
    @User('id') id: number,
    @Body() body: AuthUpdatePatchRegisterDTO,
  ) {
    return this.authService.updateRegister(id, body);
  }

  @Throttle(10, 60)
  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset/:id')
  async reset(
    @ParamId() id: number,
    @Body() { password, number }: AuthResetDTO,
  ) {
    return this.authService.reset(id, password, number);
  }

  @UseGuards(AuthGuard)
  @Patch('changepassword')
  async changePassword(@User('id') id: number, @Body() body: AuthChangeDTO) {
    return this.authService.changePassword(id, body);
  }

  @Get('validation/:id')
  async validation(@ParamId() id: number) {
    return this.authService.validation(id);
  }

  @Throttle(10, 60)
  @Post('validate')
  async validate(@Body() { email }: AuthValidateDTO) {
    return this.authService.validate(email);
  }
}
