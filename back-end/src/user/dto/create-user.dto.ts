import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 6,
    minSymbols: 0,
  })
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string;

  @IsOptional()
  @IsString()
  role?: string;
}
