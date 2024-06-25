import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class MailSendDTO {
  @ApiProperty({
    description: 'Nome do usuário que enviou o email atraves do site ',
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: 'Telefone do usuario que enviou o email atraves do site',
  })
  @IsOptional()
  @IsPhoneNumber('BR')
  phone: string;

  @ApiProperty({
    description: 'E-mail do usuario que enviou o email atraves do site',
  })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({
    description: 'Sub Titulo do usuario que enviou o email atraves do site',
  })
  @IsString()
  @IsOptional()
  subject: string;

  @ApiProperty({
    description: 'Texto do usuario que enviou o email atraves do site',
  })
  @IsString()
  @IsOptional()
  text: string;
}
