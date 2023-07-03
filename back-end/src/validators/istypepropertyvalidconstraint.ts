import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNameValid', async: false })
export class IsTypePropertyValidConstraint
  implements ValidatorConstraintInterface
{
  validate(type: string) {
    const invalidTypes = [
      'apartamento',
      'térrea',
      'sobrado',
      'galpão',
      'terreno',
    ];
    return invalidTypes.includes(type.toLowerCase());
  }

  defaultMessage() {
    return `type must be either "apartamento" or "térrea" or "sobrado" or "galpão" or "terreno"`;
  }
}
