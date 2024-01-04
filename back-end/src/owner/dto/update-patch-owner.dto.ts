import { PartialType } from '@nestjs/mapped-types';
import { CreateOwnerDTO } from './create-owner.dto';

export class UpdatePatchOwnerDTO extends PartialType(CreateOwnerDTO) {}
