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
    await this.mailerService
      .sendMail({
        to: this.configService.get('MAIL_USER'),
        from: this.configService.get('MAIL_USER'),
        subject: `${data.email} enviado pelo site assunto ${data.subject}`,
        template: './sendemail',
        context: {
          email: data.email,
          name: data.name,
          phone: data.phone,
          subject: data.subject,
          text: data.text,
        },
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Error ao enviar mensagem');
      });

    return { sucess: 'ok' };
  }

  async sendEmailConfirmtion(user: User, token: string) {
    return await this.mailerService
      .sendMail({
        to: user.email,
        from: this.configService.get('MAIL_USER'),
        subject: 'Seja Bem-Vindo! Confirme seu e-mail',
        template: './confirmation',
        context: {
          name: user.name,
          token,
        },
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Error ao enviar mensagem');
      });
  }

  async sendEmailForgotPassWord(
    user: User,
    encodeId: string,
    numberRandom: string,
  ) {
    return await this.mailerService
      .sendMail({
        from: this.configService.get('MAIL_USER'),
        subject: 'Recuperação de Senha',
        to: user.email,
        template: './forget',
        context: {
          name: user.name,
          id: encodeId,
          number: numberRandom,
        },
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Error ao enviar mensagem');
      });
  }

  async sendEmailResetPassWord(user: User) {
    return await this.mailerService
      .sendMail({
        from: this.configService.get('MAIL_USER'),
        subject: 'Confirmação de Alteração de Senha',
        to: user.email,
        template: './reset',
        context: {
          name: user.name,
        },
      })
      .catch(erro => {
        console.log(erro);
        throw new Error('Error ao enviar mensagem');
      });
  }
}
