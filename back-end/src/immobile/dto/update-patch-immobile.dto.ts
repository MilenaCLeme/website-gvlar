import { PartialType } from '@nestjs/mapped-types';
import { CreateImmobileDTO } from './create-immobile.dto';

export class UpdatePatchImmobileDTO extends PartialType(CreateImmobileDTO) {}
