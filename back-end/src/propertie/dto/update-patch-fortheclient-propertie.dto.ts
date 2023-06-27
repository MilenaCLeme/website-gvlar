import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateForTheClientPropertieDTO } from './create-fortheclient-propertie.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchForTheClientPropertieDTO extends PartialType(
  CreateForTheClientPropertieDTO,
) {
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  situation: string;
}
