import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  @IsStrongPassword(
    { minLength: 6, minSymbols: 0 },
    {
      message:
        'A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1letra minúscula.',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}
