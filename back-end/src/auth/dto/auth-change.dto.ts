import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class AuthChangeDTO {
  @ApiProperty({ description: 'A senha nova do usuário.' })
  @IsNotEmpty({ message: 'A senha é obrigatório.' })
  @IsStrongPassword(
    { minLength: 6, minSymbols: 0 },
    {
      message:
        'A senha deve ter no mínimo 6 caracteres e conter pelo menos 1 letra maiúscula e 1letra minúscula.',
    },
  )
  passwordNew: string;

  @ApiProperty({ description: 'A senha antiga do usuário.' })
  @IsString()
  @IsNotEmpty()
  passwordOld: string;
}
