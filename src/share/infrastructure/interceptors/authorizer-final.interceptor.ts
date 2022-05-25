import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

import NotImplementedAuthorizationError from '../../domain/models/errors/not-implemented-authorization.error'
import { Request, VerifiedParams } from '../http'

@Injectable()
export class AuthorizerFinalInterceptor implements NestInterceptor {
  private readonly logger = new Logger(AuthorizerFinalInterceptor.name)

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    this.logger.debug(request)
    if (request.verified && this.allParamsVerified(request.verifiedParams)) {
      return next.handle()
    } else {
      throw new NotImplementedAuthorizationError({
        meta: {
          params: this.getUnverifiedParams(request.verifiedParams),
          route: request.verified,
        },
      })
    }
  }

  allParamsVerified(params: VerifiedParams) {
    return Object.values(params).every(({ verified }) => verified)
  }

  getUnverifiedParams(params: VerifiedParams) {
    return Object.entries(params)
      .filter(([, { verified }]) => !verified)
      .map(([param]) => param)
  }
}
