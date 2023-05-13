import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmailConfirmtion(user: User, token: string) {
    return await this.mailerService.sendMail({
      to: user.email,
      from: this.configService.get('MAIL_USER'),
      subject: 'Seja Bem-Vindo! Confirme seu e-mail',
      template: './confirmation',
      context: {
        name: user.name,
        id: user.id,
        token,
      },
    });
  }

  async sendEmailForgotPassWord(user: User, token: string) {
    return await this.mailerService.sendMail({
      subject: 'Recuperação de Senha',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        id: user.id,
        token,
      },
    });
  }
}