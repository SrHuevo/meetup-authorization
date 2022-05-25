import Error, { ErrorCodes, MetaError } from './error'

export default class InvalidArgumentError extends Error {
  code = ErrorCodes.INVALID_ARGUMENT

  constructor(message: string, meta?: MetaError) {
    super(message)
  }
}
