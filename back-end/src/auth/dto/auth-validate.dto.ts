import { IsEmail } from 'class-validator';

export class AuthValidateDTO {
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;
}
