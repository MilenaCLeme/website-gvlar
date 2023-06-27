import { IsInt, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class DeletePropertyAndOwnerDTO {
  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  ownerId: number;

  @IsNumber()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  propertyId: number;
}
