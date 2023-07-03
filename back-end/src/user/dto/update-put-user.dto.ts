import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateUserDTO } from './create-user.dto';

export class UpdatePutUserDTO extends CreateUserDTO {
  @IsString()
  @IsOptional()
  hashedRefreshToken?: string;

  @IsBoolean()
  @IsOptional()
  validation?: boolean;
}
