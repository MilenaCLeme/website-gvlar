import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertieDTO } from './create-propertie.dto';

export class UpdatePatchPropertieDTO extends PartialType(CreatePropertieDTO) {}
