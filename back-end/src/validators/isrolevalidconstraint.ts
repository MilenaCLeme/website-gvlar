import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isNameValid', async: false })
export class IsRoleValidConstraint implements ValidatorConstraintInterface {
  validate(role: string) {
    const invalidRoles = ['client', 'worker'];
    return invalidRoles.includes(role.toLowerCase());
  }

  defaultMessage() {
    return `role must be either "client" or "worker"`;
  }
}
