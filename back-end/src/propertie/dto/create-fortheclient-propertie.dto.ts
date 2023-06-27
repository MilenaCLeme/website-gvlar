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

export class CreateForTheClientPropertieDTO {
  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsNumberString()
  @IsOptional()
  vsell?: string;

  @IsNumberString()
  @IsOptional()
  vboth?: string;

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
  room: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  bathroom: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  vacancy: number;

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
  postalcode: string;

  @IsString()
  @IsNotEmpty()
  neighborhood: string;

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
