import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bycrpt from 'bcrypt';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: this.issuer,
        audience: this.audience,
      });

      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async register(data: AuthRegisterDTO) {
    return this.userService.createUser(data);
  }

  async login(email: string, password: string) {
    let user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    if (!(await bycrpt.compare(password, user.hashedPassword))) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: accessToken,
    });

    return { accessToken, user };
  }

  async forget(email: string) {
    const user = await this.userService.user({ email });

    if (!user) {
      throw new UnauthorizedException('Email está incorretos.');
    }

    // TO DO: Enviar o e-mail...

    return true;
  }

  async reset(hashedPassword: string, token: string) {
    // TO DO: validar o token e id.
  }

  async validation(token: string) {
    // alterar o validation
  }
}
