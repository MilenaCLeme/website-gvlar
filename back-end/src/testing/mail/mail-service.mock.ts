import { MailService } from '../../mail/mail.service';

export const mailServiceMock = {
  provide: MailService,
  useValue: {
    sendEmail: jest.fn().mockResolvedValue({ sucess: 'ok' }),
    sendEmailConfirmtion: jest.fn().mockResolvedValue(true),
    sendEmailForgotPassWord: jest.fn().mockResolvedValue(true),
    sendEmailResetPassWord: jest.fn().mockResolvedValue(true),
  },
};
