import Error, { ErrorCodes } from './error'

export default class UnprocessableEntityError extends Error {
  code = ErrorCodes.UNPROCESSABLE_ENTITY

  constructor(message) {
    super(message)
  }
}
