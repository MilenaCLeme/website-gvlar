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
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../decorators/user.decorator';
import { AuthValidateDTO } from './dto/auth-validate.dto';
import { AuthUpdatePatchRegisterDTO } from './dto/auth-update-patch-register.dto';
import { Throttle } from '@nestjs/throttler';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { User as UserType } from '@prisma/client';
import { ParamId } from '../decorators/param-id.decorator';
import { AuthChangeDTO } from './dto/auth-change.dto';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';

@UseInterceptors(LogInterceptor)
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: AuthLoginDTO })
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('register')
  @ApiBody({ type: AuthRegisterDTO })
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
  @ApiBody({ type: AuthUpdatePatchRegisterDTO })
  async registerUpdate(
    @User('id') id: number,
    @Body() body: AuthUpdatePatchRegisterDTO,
  ) {
    return this.authService.updateRegister(id, body);
  }

  @Throttle(10, 60)
  @Post('forget')
  @ApiBody({ type: AuthForgetDTO })
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('reset/:id')
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  @ApiBody({ type: AuthResetDTO })
  async reset(
    @ParamId() id: number,
    @Body() { password, number }: AuthResetDTO,
  ) {
    return this.authService.reset(id, password, number);
  }

  @UseGuards(AuthGuard)
  @Patch('changepassword')
  @ApiBody({ type: AuthChangeDTO })
  async changePassword(@User('id') id: number, @Body() body: AuthChangeDTO) {
    return this.authService.changePassword(id, body);
  }

  @Get('validation/:id')
  @ApiParam({ name: 'id', description: 'ID do usuário' })
  async validation(@ParamId() id: number) {
    return this.authService.validation(id);
  }

  @Throttle(10, 60)
  @ApiBody({ type: AuthValidateDTO })
  @Post('validate')
  async validate(@Body() { email }: AuthValidateDTO) {
    return this.authService.validate(email);
  }
}
