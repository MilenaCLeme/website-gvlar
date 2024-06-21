import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class AuthRegisterDTO {
  @ApiProperty({ description: 'O nome do usuário.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @IsString({ message: 'O nome está incorreto.' })
  name: string;

  @ApiProperty({ description: 'O email do usuário.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário.' })
  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  @IsStrongPassword(
    { minLength: 6, minSymbols: 0 },
    {
      message:
        'A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1letra minúscula.',
    },
  )
  hashedPassword: string;

  @ApiProperty({ description: 'O Telefone do usuário.' })
  @IsNotEmpty({ message: 'O telefone é obrigatório.' })
  @IsPhoneNumber('BR', { message: 'O telefone deve ser válido para o Brasil.' })
  phone: string;
}
