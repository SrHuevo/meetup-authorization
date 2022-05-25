import Error, { ErrorCodes } from './error'

export default class NotImplementedAuthorizationError extends Error {
  code = ErrorCodes.NOT_IMPLEMENTED_AUTHORIZATION

  constructor({
    message = 'not implemented authorization yet',
    meta,
  }: {
    message?: string
    meta: { params: string[]; route: boolean }
  }) {
    super(message, meta)
  }
}
