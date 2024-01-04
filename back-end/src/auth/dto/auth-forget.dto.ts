import { IsEmail } from 'class-validator';

export class AuthForgetDTO {
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;
}
