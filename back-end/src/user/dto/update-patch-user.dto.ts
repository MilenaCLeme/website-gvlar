import { CreateUserDTO } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdatePatchUserDTO extends PartialType(CreateUserDTO) {
  @IsString()
  @IsOptional()
  hashedRefreshToken?: string;

  @IsBoolean()
  @IsOptional()
  validation?: boolean;
}
