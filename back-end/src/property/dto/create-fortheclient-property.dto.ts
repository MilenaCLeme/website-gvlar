import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString,
  Min,
  Validate,
} from 'class-validator';
import { IsBusinessValidConstraint } from 'src/validators/isbusinessvalidconstraint';
import { IsTypePropertyValidConstraint } from 'src/validators/istypepropertyvalidconstraint';

export class CreateForTheClientPropertyDTO {
  @IsString()
  @IsNotEmpty()
  @Validate(IsBusinessValidConstraint)
  business: string;

  @IsString()
  @IsNotEmpty({ message: 'O tipo do Imóvel é obrigatório.' })
  @Validate(IsTypePropertyValidConstraint)
  about: string;

  @IsNumber()
  @IsOptional()
  sell?: number;

  @IsNumber()
  @IsOptional()
  rental?: number;

  @IsNumber()
  @IsNotEmpty({ message: 'O iptu é obrigatório.' })
  iptu: number;

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatório.' })
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
  @IsNotEmpty({ message: 'O endereço é obrigatório.' })
  address: string;

  @IsString()
  @IsNotEmpty({ message: 'O numero é obrigatório.' })
  number: string;

  @IsString()
  @IsOptional()
  complement?: string;

  @IsPostalCode('BR', { message: 'CEP invalido.' })
  @IsNotEmpty({ message: 'O CEP é obrigatório.' })
  zipcode: string;

  @IsString()
  @IsNotEmpty({ message: 'O Bairro é obrigatório.' })
  area: string;

  @IsString()
  @IsNotEmpty({ message: 'O cidade é obrigatório.' })
  city: string;

  @IsString()
  @IsNotEmpty({ message: 'O estado é obrigatório.' })
  state: string;

  @IsString()
  @IsOptional()
  zone?: string;
}
