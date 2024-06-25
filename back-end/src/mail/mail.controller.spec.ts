import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { mailServiceMock } from '../testing/mail/mail-service.mock';
import { createMailSendDTO } from '../testing/mail/create-mail-dto.mock';

describe('Mail Controller', () => {
  let mailController: MailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [mailServiceMock],
    }).compile();

    mailController = module.get<MailController>(MailController);
  });

  test('Validate the definition', () => {
    expect(mailController).toBeDefined();
  });

  describe('Send Email', () => {
    test('send Email', async () => {
      const result = await mailController.sendEmail(createMailSendDTO);

      expect(result).toEqual({ sucess: 'ok' });
    });
  });
});
