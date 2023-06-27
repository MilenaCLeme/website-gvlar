import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import { MailSendDTO } from './dto/mail-send.dto';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendEmail(data: MailSendDTO) {
    return await this.mailerService.sendMail({
      to: this.configService.get('MAIL_USER'),
      from: data.email,
      subject: data.subject,
      template: './sendemail',
      context: {
        name: data.name,
        phone: data.phone,
        subject: data.subject,
        text: data.text,
      },
    });
  }

  async sendEmailConfirmtion(user: User, token: string) {
    return await this.mailerService.sendMail({
      to: user.email,
      from: this.configService.get('MAIL_USER'),
      subject: 'Seja Bem-Vindo! Confirme seu e-mail',
      template: './confirmation',
      context: {
        name: user.name,
        token,
      },
    });
  }

  async sendEmailForgotPassWord(user: User, token: string) {
    return await this.mailerService.sendMail({
      from: this.configService.get('MAIL_USER'),
      subject: 'Recuperação de Senha',
      to: user.email,
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });
  }
}
