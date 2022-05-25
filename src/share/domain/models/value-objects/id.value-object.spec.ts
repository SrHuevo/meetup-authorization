import InvalidArgumentError from '../errors/invalid-argument.error'
import { IdValueObject } from './id.value-object'

describe('IdValueObject', () => {
  test('is valid id', () => {
    expect(
      new IdValueObject('fc173d64-c648-4cb7-8fa2-42fe96d74511'),
    ).toBeDefined()
  })
  test('get random', () => {
    expect(() => IdValueObject.random()).toBeDefined()
  })
  test('error is invalid id', () => {
    expect(
      () => new IdValueObject('fc173d64ac648a4cb7a8fa2a42fe96d74511'),
    ).toThrow(
      new InvalidArgumentError(`${IdValueObject.name} is not valid uuid`),
    )
  })
  test('error is invalid id on a heir', () => {
    class HeirOfIdValueObject extends IdValueObject {}
    expect(
      () => new HeirOfIdValueObject('fc173d64ac648a4cb7a8fa2a42fe96d74511'),
    ).toThrowError(
      new InvalidArgumentError(`${HeirOfIdValueObject.name} is not valid uuid`),
    )
  })
})
