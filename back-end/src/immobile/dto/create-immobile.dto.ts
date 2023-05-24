import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  Min,
} from 'class-validator';

export class CreateImmobileDTO {
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  about: string;

  @IsString()
  @IsOptional()
  vsell?: string;

  @IsString()
  @IsOptional()
  vboth?: string;

  @IsString()
  @IsNotEmpty()
  iptu: string;

  @IsString()
  @IsNotEmpty()
  describe: string;

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
}
