import { isAfter, isBefore, isValid } from 'date-fns'

import InvalidArgumentError from '../errors/invalid-argument.error'
import { ValueObject } from './value-object'

export class DateValueObject implements ValueObject<string> {
  private _value: Date

  constructor(
    private date: string,
    private min?: string,
    private max?: string,
  ) {
    this.ensureIsValidDate(date, 'date')
    this._value = new Date(date)
    this.ensureIsMinimallySoon()
    this.ensureIsUtterlyLate()
  }

  public ensureIsValidDate(date: string, name: string): void {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(date)) {
      throw new InvalidArgumentError(
        `the format of property "${name}" of "${this.constructor.name}" with value "${date}" class must be ISO`,
      )
    } else if (!isValid(new Date(date))) {
      throw new InvalidArgumentError(
        `the property "${name}" of "${this.constructor.name}" with value "${date}" is invalid date`,
      )
    }
  }

  private ensureIsMinimallySoon(): void {
    if (this.min) {
      this.ensureIsValidDate(this.min, 'min')
      const minDate = new Date(this.min)
      if (isBefore(this._value, minDate)) {
        throw new InvalidArgumentError(
          `"${this.constructor.name}" must be after that "${this.min}"`,
        )
      }
    }
  }

  private ensureIsUtterlyLate(): void {
    if (this.max) {
      this.ensureIsValidDate(this.max, 'max')
      const maxDate = new Date(this.max)
      if (isAfter(this._value, maxDate)) {
        throw new InvalidArgumentError(
          `"${this.constructor.name}" must be before that "${this.max}"`,
        )
      }
    }
  }

  public get value(): string {
    return this.toString()
  }

  public toString(): string {
    return this.date
  }
}
