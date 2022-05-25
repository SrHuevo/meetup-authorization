import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'

import { Response } from '../http'

@Catch()
export class UnexpectedErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    console.error(exception)
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()

    response.status(500).json(exception)
  }
}
