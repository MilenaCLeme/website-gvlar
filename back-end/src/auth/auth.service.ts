import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
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

  async checkToken(token: string) {
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

  async isValidToken(token: string) {
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

  async login(email: string, hashedPassword: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        hashedPassword,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.');
    }

    return user;
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

  async validation(id: number, token: string) {
    // alterar o validation
  }
}
