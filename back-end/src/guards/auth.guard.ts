import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import * as bycrpt from 'bcrypt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest().headers;
    const { authorization } = request;

    try {
      const token = (authorization ?? '').split(' ')[1];

      const data = this.authService.checkToken(token);

      request.tokenPayload = data;

      const user = await this.userService.showId(data.id);

      request.user = user;

      if (!(await bycrpt.compare(token, user.hashedRefreshToken))) {
        throw new UnauthorizedException('Token invalido');
      }

      return true;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
