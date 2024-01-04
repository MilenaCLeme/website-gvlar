import { IsInt, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class FilterPagePropertyDTO {
  @IsString()
  @IsOptional()
  business?: string;

  @IsString()
  @IsOptional()
  about?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsNumber()
  @IsOptional()
  minV?: number;

  @IsNumber()
  @IsOptional()
  maxV?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  minFoo?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  maxFoo?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  bedroom?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  bathroom?: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsOptional()
  garage?: number;

  @IsString()
  @IsOptional()
  order?: string;
}
