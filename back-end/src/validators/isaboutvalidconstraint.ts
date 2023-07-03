import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNameValid', async: false })
export class IsAboutValidConstraint implements ValidatorConstraintInterface {
  validate(about: string) {
    const invalidAbouts = ['aluguel', 'venda', 'ambos'];
    return invalidAbouts.includes(about.toLowerCase());
  }

  defaultMessage() {
    return `role must be either "aluguel" or "venda" or "ambos"`;
  }
}
