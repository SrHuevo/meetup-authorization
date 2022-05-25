import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import UnauthorizedError from '../../../domain/models/errors/unauthorized.error'
import { Request } from '../../../infrastructure/http'

@Injectable()
export class AuthenticateInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const token = request.header('Authorization')
    if (!/.+token-.+/.test(token)) {
      throw new UnauthorizedError()
    }
    return next.handle()
  }
}
