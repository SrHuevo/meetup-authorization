import InvalidArgumentError from '../errors/invalid-argument.error'
import { StringValueObject } from './string.value-object'

export class EmailValueObject extends StringValueObject {
  constructor(
    private email: string,
    private configEmail: {
      regex: RegExp
      acceptPlusOption: boolean
      required: boolean
    } = {
      regex:
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
      required: true,
      acceptPlusOption: false,
    },
  ) {
    super(email, { required: configEmail.required })
    this.ensureIsValidEmail()
  }

  private ensureIsValidEmail(): void {
    if (!this.configEmail.required && !this.email) {
      return
    }
    if (this.configEmail.regex.test(this.email)) {
      return
    }
    throw new InvalidArgumentError(`${this.constructor.name} is invalid`)
  }
}
