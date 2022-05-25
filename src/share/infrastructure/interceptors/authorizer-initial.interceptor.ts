import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

import { Injectable } from '../dependency-injection'
import { Request } from '../http'

@Injectable()
export class AuthorizerInitialInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>()
    request.verified = false
    request.verifiedParams = Object.entries(request.params).reduce(
      (params, [key, value]) => {
        params[key] = { value, verified: false }
        return params
      },
      {} as any,
    )
    return next.handle()
  }
}
