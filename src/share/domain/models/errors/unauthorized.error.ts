import Error, { ErrorCodes } from './error'

export default class UnauthorizedError extends Error {
  code = ErrorCodes.UNAUTHORIZED

  constructor(message = 'bad credentials') {
    super(message)
  }
}
