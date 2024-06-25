import { IsOptional, IsString, Validate } from 'class-validator';
import { AuthRegisterDTO } from '../../auth/dto/auth-register.dto';
import { IsRoleValidConstraint } from '../../validators/isrolevalidconstraint';

export class CreateUserDTO extends AuthRegisterDTO {
  @IsOptional()
  @IsString()
  @Validate(IsRoleValidConstraint)
  role?: string;
}
