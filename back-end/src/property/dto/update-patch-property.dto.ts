import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDTO } from './create-property.dto';

export class UpdatePatchPropertyDTO extends PartialType(CreatePropertyDTO) {}
