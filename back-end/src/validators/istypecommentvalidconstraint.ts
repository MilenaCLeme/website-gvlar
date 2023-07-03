import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNameValid', async: false })
export class IsTypeCommentValidConstraint
  implements ValidatorConstraintInterface
{
  validate(type: string) {
    const invalidTypes = ['comprador', 'locatário'];
    return invalidTypes.includes(type.toLowerCase());
  }

  defaultMessage() {
    return `type must be either "comprador" or "locatário"`;
  }
}
