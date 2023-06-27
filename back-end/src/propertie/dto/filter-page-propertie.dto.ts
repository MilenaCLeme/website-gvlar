import {
  IsInt,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class FilterPagePropertieDTO {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsNumberString()
  @IsOptional()
  minV?: string;

  @IsNumberString()
  @IsOptional()
  maxV?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  minFoo?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  maxFoo?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  room?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  bathroom?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  vacancy?: number;
}
