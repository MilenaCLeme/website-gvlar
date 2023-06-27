import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { CreateForTheClientPropertieDTO } from './create-fortheclient-propertie.dto';

export class CreatePropertieDTO extends CreateForTheClientPropertieDTO {
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsOptional()
  situation?: string;
}
