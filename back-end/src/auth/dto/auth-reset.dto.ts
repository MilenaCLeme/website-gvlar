import { IsNotEmpty, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
  })
  password: string;
}
