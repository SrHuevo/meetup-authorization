import InvalidArgumentError from '../errors/invalid-argument.error'
import { ValueObject } from './value-object'

export class StringValueObject implements ValueObject<string> {
  constructor(
    private str: string,
    private config: {
      minLength?: number
      maxLength?: number
      required?: boolean
    } = { required: true },
  ) {
    this.ensureIsValid()
    this.ensureIsLongEnough()
    this.ensureIsShortEnough()
  }

  private ensureIsValid(): void {
    if (!this.config.required && this.str === null) {
      return
    }
    if (typeof this.str !== 'string') {
      throw new InvalidArgumentError(
        `${this.constructor.name} must be a string`,
      )
    }
  }

  private ensureIsLongEnough(): void {
    if (
      Number.isInteger(this.config?.minLength) &&
      this.str.length < this.config.minLength
    ) {
      throw new InvalidArgumentError(
        `${this.constructor.name} must be longer or equal than ${this.config.minLength}`,
      )
    }
  }

  private ensureIsShortEnough(): void {
    if (
      Number.isInteger(this.config?.maxLength) &&
      this.str.length > this.config.maxLength
    ) {
      throw new InvalidArgumentError(
        `${this.constructor.name} must be shorter or equal than ${this.config.maxLength}`,
      )
    }
  }

  public get value(): string {
    return this.str
  }

  public toString(): string {
    return this.str
  }
}
