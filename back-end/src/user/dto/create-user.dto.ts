import { IsOptional, IsString, Validate } from 'class-validator';
import { AuthRegisterDTO } from 'src/auth/dto/auth-register.dto';
import { IsRoleValidConstraint } from 'src/validators/isrolevalidconstraint';

export class CreateUserDTO extends AuthRegisterDTO {
  @IsOptional()
  @IsString()
  @Validate(IsRoleValidConstraint)
  role?: string;
}
