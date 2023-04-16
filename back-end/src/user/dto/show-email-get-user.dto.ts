import { IsEmail, IsNotEmpty } from 'class-validator';

export class ShowEmailUserDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
