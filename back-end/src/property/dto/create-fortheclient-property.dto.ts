import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPostalCode,
  IsString,
  Min,
} from 'class-validator';

export class CreateForTheClientPropertyDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsNumberString()
  @IsOptional()
  sell?: string;

  @IsNumberString()
  @IsOptional()
  rental?: string;

  @IsNumberString()
  @IsNotEmpty()
  iptu: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  footage: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bedroom: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bathroom: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  garage: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsPostalCode('BR')
  @IsNotEmpty()
  zipcode: string;

  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zone: string;
}
