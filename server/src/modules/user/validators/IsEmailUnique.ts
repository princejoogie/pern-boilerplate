import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { User } from "../../../entity/User";

@ValidatorConstraint()
export class IsEmailUniqueConstraint implements ValidatorConstraintInterface {
  defaultMessage(args: ValidationArguments) {
    return `${args.property} already in use`;
  }

  validate(email: string) {
    return User.findOne({ where: { email } }).then((user) => {
      if (!user) return true;
      return false;
    });
  }
}

export function IsEmailUnique(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      async: true,
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsEmailUniqueConstraint,
    });
  };
}
