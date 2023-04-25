import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
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
          issuer: 'API NestJs',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken() {
    // return this.jwtService..verify()
  }

  async register(data: AuthRegisterDTO) {
    // registar e
  }

  async login(email: string, password: string) {
    // login com email
  }

  async forget(email: string) {
    // enviar email para um novo
  }

  async reset(password: string, token: string) {}

  async validation(id: number, token: string) {}
}
