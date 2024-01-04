import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class MailSendDTO {
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsPhoneNumber('BR')
  phone: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  subject: string;

  @IsString()
  @IsOptional()
  text: string;
}
