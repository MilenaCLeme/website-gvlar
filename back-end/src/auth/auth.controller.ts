import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
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

  @UseGuards(AuthGuard)
  @Post('reset')
  async reset(@User('id') id: number, @Body() { password }: AuthResetDTO) {
    console.log(id);
    return this.authService.reset(id, password);
  }

  @UseGuards(AuthGuard)
  @Post('validation')
  async validation(
    @User('id') id: number,
    @User('validation') validation: boolean,
  ) {
    return this.authService.validation(id, validation);
  }

  @Throttle(10, 60)
  @Post('validate')
  async validate(@Body() { email }: AuthValidateDTO) {
    return this.authService.validate(email);
  }
}
