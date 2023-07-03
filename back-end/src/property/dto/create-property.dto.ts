import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateForTheClientPropertyDTO } from './create-fortheclient-property.dto';

export class CreatePropertyDTO extends CreateForTheClientPropertyDTO {
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  situation?: string;
}
