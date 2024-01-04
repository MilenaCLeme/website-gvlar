import { CreateForTheClientPropertyDTO } from './create-fortheclient-property.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchForTheClientPropertyDTO extends PartialType(
  CreateForTheClientPropertyDTO,
) {}
