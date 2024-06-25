import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsTypeCommentValidConstraint } from '../../validators/istypecommentvalidconstraint';

export class CreateCommentDTO {
  @ApiProperty({ description: 'Nome do usuario que escreveu o comentario.' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'O tipo que esta definido como comprador ou locatário',
  })
  @IsString()
  @IsNotEmpty()
  @Validate(IsTypeCommentValidConstraint)
  type: string;

  @ApiProperty({ description: 'O comentario' })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
