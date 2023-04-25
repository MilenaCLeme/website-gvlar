import { IsOptional, IsString } from 'class-validator';
import { AuthRegisterDTO } from 'src/auth/dto/auth-register.dto';

export class CreateUserDTO extends AuthRegisterDTO {
  @IsOptional()
  @IsString()
  role?: string;
}
