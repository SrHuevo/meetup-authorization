import { loremIpsum } from 'lorem-ipsum'

import InvalidArgumentError from '../errors/invalid-argument.error'
import { StringValueObject } from './string.value-object'

describe('NumberValueObject', () => {
  test('should be null if not required', () => {
    expect(new StringValueObject(null, { required: false })).toBeDefined()
    expect(() => new StringValueObject(undefined, { required: false })).toThrow(
      new InvalidArgumentError(`${StringValueObject.name} must be a string`),
    )
  })
  test('should be string', () => {
    expect(new StringValueObject('')).toBeDefined()
    expect(new StringValueObject(loremIpsum())).toBeDefined()
    expect(() => new StringValueObject(null)).toThrow(
      new InvalidArgumentError(`${StringValueObject.name} must be a string`),
    )
  })
  test('should be longer or equal than', () => {
    expect(() => new StringValueObject('ab', { minLength: 1 })).toBeDefined()
    expect(() => new StringValueObject('a', { minLength: 1 })).toBeDefined()
    expect(() => new StringValueObject('', { minLength: 1 })).toThrow(
      new InvalidArgumentError(
        `${StringValueObject.name} must be longer or equal than 1`,
      ),
    )
  })
  test('should be shorter or equal', () => {
    expect(() => new StringValueObject('', { maxLength: 1 })).toBeDefined()
    expect(() => new StringValueObject('a', { maxLength: 1 })).toBeDefined()
    expect(() => new StringValueObject('😘', { maxLength: 1 })).toBeDefined()
    expect(() => new StringValueObject('ab', { maxLength: 1 })).toThrow(
      new InvalidArgumentError(
        `${StringValueObject.name} must be shorter or equal than 1`,
      ),
    )
  })
  test('should be between range long', () => {
    expect(
      () => new StringValueObject('', { minLength: 1, maxLength: 3 }),
    ).toThrow(
      new InvalidArgumentError(
        `${StringValueObject.name} must be longer or equal than 1`,
      ),
    )
    expect(
      () => new StringValueObject('a', { minLength: 1, maxLength: 3 }),
    ).toBeDefined()
    expect(
      () => new StringValueObject('ab', { minLength: 1, maxLength: 3 }),
    ).toBeDefined()
    expect(
      () => new StringValueObject('abc', { minLength: 1, maxLength: 3 }),
    ).toBeDefined()
    expect(
      () => new StringValueObject('abcd', { minLength: 1, maxLength: 3 }),
    ).toThrow(
      new InvalidArgumentError(
        `${StringValueObject.name} must be shorter or equal than 3`,
      ),
    )
  })
})
