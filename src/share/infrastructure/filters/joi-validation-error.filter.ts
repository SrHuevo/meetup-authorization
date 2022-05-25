import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { JoiPipeValidationException } from 'nestjs-joi'

import UnprocessableEntityError from '../../domain/models/errors/unprocessable-entity.error'

@Catch(JoiPipeValidationException)
export class JoiValidationErrorFilter implements ExceptionFilter {
  catch(exception: JoiPipeValidationException, host: ArgumentsHost) {
    throw new UnprocessableEntityError(exception.message)
  }
}
