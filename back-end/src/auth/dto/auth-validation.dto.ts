import { IsJWT } from 'class-validator';

export class AuthValidationDTO {
  @IsJWT()
  token: string;
}
