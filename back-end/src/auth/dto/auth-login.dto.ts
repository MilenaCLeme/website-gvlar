import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @ApiProperty({ description: 'O email do usuário.' })
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @ApiProperty({ description: 'A senha do usuário.' })
  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  password: string;
}
