import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common'
import { Response } from 'express'

import Error, { ErrorCodes } from '../../domain/models/errors/error'

const httpErrors: Record<ErrorCodes, number> = {
  [ErrorCodes.UNAUTHORIZED]: 401,
  [ErrorCodes.FORBIDDEN]: 403,
  [ErrorCodes.NOT_FOUND]: 403,
  [ErrorCodes.UNPROCESSABLE_ENTITY]: 422,
  [ErrorCodes.NOT_IMPLEMENTED]: 501,
  [ErrorCodes.NOT_IMPLEMENTED_AUTHORIZATION]: 501,
  [ErrorCodes.INVALID_ARGUMENT]: 500,
}

@Catch(Error)
export class ExpectedErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(ExpectedErrorFilter.name)

  catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(httpErrors[exception.code]).json(exception)
  }
}
