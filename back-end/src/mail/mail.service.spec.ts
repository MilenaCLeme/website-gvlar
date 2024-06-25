import { Test, TestingModule } from '@nestjs/testing';
import { MailService } from './mail.service';
import { MailerServiceMock } from '../testing/mail/mailer-service.mock';
import { createMailSendDTO } from '../testing/mail/create-mail-dto.mock';
import { userEntityList } from '../testing/user-entity-list.mock';
import { token } from '../testing/token.mock';
import { ConfigServiceMock } from '../testing/config-service.mock';

describe('MailService', () => {
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MailService, MailerServiceMock, ConfigServiceMock],
    }).compile();

    mailService = module.get<MailService>(MailService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Validate the definition', () => {
    expect(mailService).toBeDefined();
  });

  describe('send email all', () => {
    test('send email', async () => {
      const result = await mailService.sendEmail(createMailSendDTO);

      expect(result).toEqual({ sucess: 'ok' });
    });

    test('send email confirmtion', async () => {
      const result = await mailService.sendEmailConfirmtion(
        userEntityList[0],
        token,
      );

      expect(result).toEqual(true);
    });

    test('send email forgot password', async () => {
      const result = await mailService.sendEmailForgotPassWord(
        userEntityList[0],
        'MC==',
        '5248',
      );

      expect(result).toEqual(true);
    });

    test('send email reset password', async () => {
      const result = await mailService.sendEmailResetPassWord(
        userEntityList[0],
      );

      expect(result).toEqual(true);
    });
  });
});
