import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import * as bycrpt from 'bcrypt';
import { MailService } from 'src/mail/mail.service';
import { AuthUpdatePatchRegisterDTO } from './dto/auth-update-patch-register.dto';

@Injectable()
export class AuthService {
  private issuer = 'gvlar';
  private audience = 'users';

  constructor(
    @Inject(forwardRef(() => JwtService))
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    @Inject(forwardRef(() => MailService))
    private readonly mailService: MailService,
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
    return await this.userService.createUser(data);
  }

  async updateRegister(id: number, data: AuthUpdatePatchRegisterDTO) {
    return await this.userService.updateUser(id, data);
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

    if (!user.validation) {
      throw new UnauthorizedException('Email não validato');
    }

    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: accessToken,
    });

    return { accessToken, user };
  }

  async forget(email: string) {
    let user = await this.userService.user({ email });

    if (!user) {
      throw new UnauthorizedException('Email está incorretos.');
    }

    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: accessToken,
    });

    await this.mailService.sendEmailForgotPassWord(user, accessToken);

    return { accessToken };
  }

  async reset(id: number, hashedPassword: string) {
    let user = await this.userService.updateUser(id, {
      hashedPassword,
      validation: true,
    });

    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(id, {
      hashedRefreshToken: accessToken,
    });

    return { accessToken, user };
  }

  async validation(id: number, validation: boolean) {
    if (validation) {
      throw new NotFoundException(`O usuário ${id} já está valido`);
    }

    return await this.userService.updateUser(id, { validation: true });
  }

  async validate(email: string) {
    let user = await this.userService.user({ email });

    if (!user) {
      throw new UnauthorizedException('Email está incorretos.');
    }

    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: accessToken,
    });

    await this.mailService.sendEmailConfirmtion(user, accessToken);

    return { accessToken };
  }
}
