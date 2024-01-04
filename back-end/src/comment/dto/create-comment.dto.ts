import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsTypeCommentValidConstraint } from 'src/validators/istypecommentvalidconstraint';

export class CreateCommentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsTypeCommentValidConstraint)
  type: string;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
