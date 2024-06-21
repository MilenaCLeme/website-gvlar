import { MailService } from '../mail/mail.service';

export const mailRepositoryMock = {
  provide: MailService,
  useValue: {
    sendEmailConfirmtion: jest.fn(),
    sendEmailForgotPassWord: jest.fn().mockResolvedValue(true),
  },
};
