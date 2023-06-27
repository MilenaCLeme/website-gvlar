import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class MailSendDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
