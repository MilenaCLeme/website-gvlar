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
import { MailService } from 'src/mail/mail.service';
import { AuthUpdatePatchRegisterDTO } from './dto/auth-update-patch-register.dto';
import { AuthChangeDTO } from './dto/auth-change.dto';

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

  async checkTokenValidity(user: User) {
    const { accessToken } = this.createToken(user);

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: accessToken,
    });

    return { accessToken, user };
  }

  async logout(user: User) {
    await this.userService.updateUser(user.id, {
      hashedRefreshToken: null,
    });

    return { sucess: 'Ok' };
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

  generateRandom4DigitNumber() {
    const randomNumber = Math.floor(Math.random() * 10000);

    return randomNumber.toString().padStart(4, '0');
  }

  async forget(email: string) {
    let user = await this.userService.user({ email });

    if (!user) {
      throw new UnauthorizedException('Email está incorretos.');
    }

    const encodeid = this.userService.encodeString(`${user.id}`);

    const numberRandom = this.generateRandom4DigitNumber();

    user = await this.userService.updateUser(user.id, {
      hashedRefreshToken: numberRandom,
    });

    await this.mailService.sendEmailForgotPassWord(
      user,
      encodeid,
      numberRandom,
    );

    return { sucess: 'Ok' };
  }

  async reset(id: number, hashedPassword: string, number: string) {
    await this.userService.showId(id);

    const user = await this.userService.user({ id });

    if (!(await bycrpt.compare(number, user.hashedRefreshToken))) {
      throw new UnauthorizedException('codigo invalido');
    }

    await this.mailService.sendEmailResetPassWord(user);

    await this.userService.updateUser(id, {
      hashedPassword,
      validation: true,
    });

    return { sucess: 'Ok' };
  }

  async changePassword(id: number, body: AuthChangeDTO) {
    await this.userService.showId(id);

    let user = await this.userService.user({ id });

    if (!(await bycrpt.compare(body.passwordOld, user.hashedPassword))) {
      throw new UnauthorizedException('Senha antiga não valida');
    }

    user = await this.userService.updateUser(id, {
      hashedPassword: body.passwordNew,
    });

    return user;
  }

  async validation(id: number) {
    await this.userService.showId(id);

    const user = await this.userService.user({ id });

    if (user.validation) {
      throw new BadRequestException('Usuario já validato');
    }

    await this.userService.updateUser(id, { validation: true });

    return { sucess: 'Ok' };
  }

  async validate(email: string) {
    const user = await this.userService.user({ email });

    if (!user) {
      throw new UnauthorizedException('Email está incorretos.');
    }

    const accessToken = this.userService.encodeString(`${user.id}`);

    await this.mailService.sendEmailConfirmtion(user, accessToken);

    return { sucess: 'Ok' };
  }
}
