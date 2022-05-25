import Error, { ErrorCodes } from './error'

export default class NotFoundError extends Error {
  code = ErrorCodes.NOT_FOUND

  constructor(
    resourceName: string,
    resourceValue: string,
    message = 'not found',
  ) {
    super(message, { name: resourceName, value: resourceValue })
  }
}
