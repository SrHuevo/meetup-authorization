import InvalidArgumentError from '../errors/invalid-argument.error'
import { DateValueObject } from './date.value-object'

describe('DateValueObject', function () {
  const date = '2022-01-01T00:00:00.000Z'
  const notISODate = '2022/01/50T00:00:00.000Z'
  const invalidDate = '2022-01-50T00:00:00.000Z'

  const exampleDate = new DateValueObject(date)
  const properties = Object.keys(exampleDate)

  it('error iso for property date', () => {
    expect(() => new DateValueObject(notISODate)).toThrowError(
      new InvalidArgumentError(
        `the format of property "${properties[0]}" of "${DateValueObject.name}" with value "${notISODate}" class must be ISO`,
      ),
    )
  })

  it('error invalid for property date', () => {
    expect(() => new DateValueObject(invalidDate)).toThrowError(
      new InvalidArgumentError(
        `the property "${properties[0]}" of "${DateValueObject.name}" with value "${invalidDate}" is invalid date`,
      ),
    )
  })

  it('error iso for property max', () => {
    expect(() => new DateValueObject(date, notISODate)).toThrowError(
      new InvalidArgumentError(
        `the format of property "${properties[1]}" of "${DateValueObject.name}" with value "${notISODate}" class must be ISO`,
      ),
    )
  })

  it('error invalid for property max', () => {
    expect(() => new DateValueObject(date, invalidDate)).toThrowError(
      new InvalidArgumentError(
        `the property "${properties[1]}" of "${DateValueObject.name}" with value "${invalidDate}" is invalid date`,
      ),
    )
  })

  it('error iso for property min', () => {
    expect(() => new DateValueObject(date, date, notISODate)).toThrowError(
      new InvalidArgumentError(
        `the format of property "${properties[2]}" of "${DateValueObject.name}" with value "${notISODate}" class must be ISO`,
      ),
    )
  })

  it('error invalid for property min', () => {
    expect(() => new DateValueObject(date, date, invalidDate)).toThrowError(
      new InvalidArgumentError(
        `the property "${properties[2]}" of "${DateValueObject.name}" with value "${invalidDate}" is invalid date`,
      ),
    )
  })

  it('error invalid on a heir', () => {
    class HeirOfDataValueObject extends DateValueObject {}
    expect(() => new HeirOfDataValueObject(invalidDate)).toThrowError(
      new InvalidArgumentError(
        `the property "${properties[0]}" of "${HeirOfDataValueObject.name}" with value "${invalidDate}" is invalid date`,
      ),
    )
  })
})
