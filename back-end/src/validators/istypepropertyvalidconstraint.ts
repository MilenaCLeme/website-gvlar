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
      'Apartamento',
      'Casa Térreo',
      'Sobrado',
      'Galpão',
      'Terreno',
    ];

    if (type !== undefined) {
      return invalidTypes.includes(type);
    }
  }

  defaultMessage() {
    return `Selecione o tipo do Imóvel`;
  }
}
