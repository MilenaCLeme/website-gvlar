import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginDTO {
  @IsNotEmpty({ message: 'O email é obrigatório.' })
  @IsEmail({}, { message: 'O email deve ser válido.' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  password: string;
}
