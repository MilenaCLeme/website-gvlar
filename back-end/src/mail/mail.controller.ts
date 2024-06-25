import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { MailSendDTO } from './dto/mail-send.dto';
import { MailService } from './mail.service';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@UseInterceptors(LogInterceptor)
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiBody({ type: MailSendDTO })
  @Post()
  async sendEmail(@Body() data: MailSendDTO) {
    return await this.mailService.sendEmail(data);
  }
}
