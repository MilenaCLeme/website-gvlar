import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { CreateForTheClientPropertyDTO } from './create-fortheclient-property.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePatchForTheClientPropertyDTO extends PartialType(
  CreateForTheClientPropertyDTO,
) {
  @IsBoolean()
  @IsNotEmpty()
  published: boolean;

  @IsString()
  @IsNotEmpty()
  situation: string;
}
