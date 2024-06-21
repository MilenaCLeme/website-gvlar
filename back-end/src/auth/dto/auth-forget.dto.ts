import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @ApiProperty({ description: 'O email do usuário.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;
}
