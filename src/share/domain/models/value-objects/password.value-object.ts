import { Dictionary } from '../../../infrastructure/typescript'
import InvalidArgumentError from '../errors/invalid-argument.error'
import { StringValueObject } from './string.value-object'

interface SecurityPatter {
  description: string
  patter: RegExp
}

export class PasswordValueObject extends StringValueObject {
  constructor(
    password: string,
    private configPassword: {
      securityPatter?: SecurityPatter
      required?: boolean
    } = {
      securityPatter:
        SECURITY_PATTERS.MINIMUM_8_CHARS_AT_LEAST_ONE_UPPERCASE_ONE_LOWER_CASE_ONE_NUMBER_ONE_SYMBOL,
      required: true,
    },
  ) {
    super(password, { required: configPassword.required })
    this.ensureIsSecure()
  }

  static getCompletePattern(min?: number, max?: number) {
    min = (min || '') as any
    max = (max || '') as any
    return new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&.,])[A-Za-z\\d@$!%*?&.,]{' +
        min +
        ',' +
        max +
        '}',
    )
  }

  private ensureIsSecure(): void {
    if (!this.configPassword.required && !this.value) {
      return
    }
    if (this.configPassword.securityPatter.patter.test(this.value)) {
      return
    }
    throw new InvalidArgumentError(
      `${this.constructor.name} must match with the pattern`,
      {
        meta: {
          pattern: this.configPassword.securityPatter.description,
        },
      },
    )
  }
}

const SECURITY_PATTERS: Dictionary<SecurityPatter> = {
  MINIMUM_8_CHARS_AT_LEAST_ONE_LETTER_ONE_NUMBER: {
    description: 'Minimum eight characters, at least one letter and one number',
    patter: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  },
  MINIMUM_8_CHARS_AT_LEAST_ONE_LETTER_ONE_NUMBER_ONE_SYMBOL: {
    description:
      'Minimum eight characters, at least one letter, one number and one special character',
    patter: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  },
  MINIMUM_8_CHARS_AT_LEAST_ONE_UPPERCASE_ONE_LOWER_CASE_ONE_NUMBER: {
    description:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter and one number',
    patter: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  },
  MINIMUM_8_CHARS_AT_LEAST_ONE_UPPERCASE_ONE_LOWER_CASE_ONE_NUMBER_ONE_SYMBOL: {
    description:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    patter: PasswordValueObject.getCompletePattern(8),
  },
  BETWEEN_8_12_CHARS_AT_LEAST_ONE_UPPERCASE_ONE_LOWER_CASE_ONE_NUMBER_ONE_SYMBOL:
    {
      description:
        'Minimum eight and maximum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
      patter: PasswordValueObject.getCompletePattern(8, 12),
    },
}
