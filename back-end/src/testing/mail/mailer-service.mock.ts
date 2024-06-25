import { MailerService } from '@nestjs-modules/mailer';

export const MailerServiceMock = {
  provide: MailerService,
  useValue: {
    sendMail: jest.fn().mockResolvedValue(true),
  },
};
