import { Body, Controller, Post } from '@nestjs/common';
import { MailSendDTO } from './dto/mail-send.dto';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  async sendEmail(@Body() data: MailSendDTO) {
    return await this.mailService.sendEmail(data);
  }
}
