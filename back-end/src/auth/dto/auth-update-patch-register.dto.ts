import { PartialType } from '@nestjs/mapped-types';
import { AuthRegisterDTO } from './auth-register.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(AuthRegisterDTO)
export class AuthUpdatePatchRegisterDTO extends PartialType(AuthRegisterDTO) {}
