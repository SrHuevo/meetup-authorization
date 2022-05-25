import { v4 as uuid, validate } from 'uuid'

import InvalidArgumentError from '../errors/invalid-argument.error'
import { StringValueObject } from './string.value-object'

export class IdValueObject extends StringValueObject {
  constructor(private id: string) {
    super(id, { minLength: 36, maxLength: 36 })
    this.ensureIsValidUuid()
  }

  private ensureIsValidUuid(): void {
    if (!validate(this.value)) {
      throw new InvalidArgumentError(
        `${this.constructor.name} is not valid uuid`,
      )
    }
  }

  static random(): IdValueObject {
    return new IdValueObject(uuid())
  }

  public get value(): string {
    return this.id
  }

  public toString(): string {
    return this.id
  }
}
