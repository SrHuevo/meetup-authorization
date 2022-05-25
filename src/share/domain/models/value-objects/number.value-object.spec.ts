import InvalidArgumentError from '../errors/invalid-argument.error'
import { NumberValueObject } from './number.value-object'

describe('NumberValueObject', () => {
  test('should be null if not required', () => {
    expect(new NumberValueObject(null, { required: false })).toBeDefined()
    expect(() => new NumberValueObject(undefined, { required: false })).toThrow(
      new InvalidArgumentError(`${NumberValueObject.name} must be a number`),
    )
  })
  test('should be finite', () => {
    expect(
      new NumberValueObject(Math.round(Math.random() * 1000)),
    ).toBeDefined()
    expect(new NumberValueObject(Math.random())).toBeDefined()
    expect(() => new NumberValueObject(NaN)).toThrow(
      new InvalidArgumentError(`${NumberValueObject.name} must be a number`),
    )
    expect(() => new NumberValueObject(null)).toThrow(
      new InvalidArgumentError(`${NumberValueObject.name} must be a number`),
    )
  })
  test('should be less or equal', () => {
    expect(() => new NumberValueObject(2, { min: 1 })).toBeDefined()
    expect(() => new NumberValueObject(1, { min: 1 })).toBeDefined()
    expect(() => new NumberValueObject(0, { min: 1 })).toThrow(
      new InvalidArgumentError(
        `${NumberValueObject.name} must be greater or equal than 1`,
      ),
    )
  })
  test('should be greater or equal', () => {
    expect(() => new NumberValueObject(0, { max: 1 })).toBeDefined()
    expect(() => new NumberValueObject(1, { max: 1 })).toBeDefined()
    expect(() => new NumberValueObject(2, { max: 1 })).toThrow(
      new InvalidArgumentError(
        `${NumberValueObject.name} must be less or equal than 1`,
      ),
    )
  })
  test('should be between peaks', () => {
    expect(() => new NumberValueObject(0, { min: 1, max: 3 })).toThrow(
      new InvalidArgumentError(
        `${NumberValueObject.name} must be greater or equal than 1`,
      ),
    )
    expect(() => new NumberValueObject(1, { min: 1, max: 3 })).toBeDefined()
    expect(() => new NumberValueObject(2, { min: 1, max: 3 })).toBeDefined()
    expect(() => new NumberValueObject(3, { min: 1, max: 3 })).toBeDefined()
    expect(() => new NumberValueObject(4, { min: 1, max: 3 })).toThrow(
      new InvalidArgumentError(
        `${NumberValueObject.name} must be less or equal than 3`,
      ),
    )
  })
})
