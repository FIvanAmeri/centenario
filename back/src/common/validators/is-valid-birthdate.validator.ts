import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import dayjs from 'dayjs';

@ValidatorConstraint({ name: 'isValidBirthDate', async: false })
export class IsValidBirthDate implements ValidatorConstraintInterface {
  validate(value: string, _args: ValidationArguments): boolean {
    const birthDate = dayjs(value);
    const today = dayjs();
    const age = today.diff(birthDate, 'year');

    return birthDate.isBefore(today) && age >= 18;
  }

  defaultMessage(_args: ValidationArguments): string {
    return 'La fecha de nacimiento debe ser anterior a hoy y mayor de 18 años';
  }
}