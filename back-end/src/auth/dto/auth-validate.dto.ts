import { IsEmail } from 'class-validator';

export class AuthValidateDTO {
  @IsEmail()
  email: string;
}
