import Error, { ErrorCodes } from './error'

export default class NotImplementedError extends Error {
  code = ErrorCodes.NOT_IMPLEMENTED

  constructor(message = 'not implemented') {
    super(message)
  }
}
