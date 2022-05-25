import Error, { ErrorCodes } from './error'

export default class ForbiddenError extends Error {
  code = ErrorCodes.FORBIDDEN

  constructor(message = 'forbidden') {
    super(message)
  }
}
