import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'

import { ENVIRONMENT, ENVIRONMENTS } from '../env'
import { Request } from '../http'

export abstract class AuthorizerMiddleInterceptor implements NestInterceptor {
  private cache: { [path: string]: boolean } = {}

  constructor(private route: string | RegExp) {}

  abstract authorize(request: Request): Promise<void>

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>()
    const path = request.route.path
    if (this.cache[path] === undefined) {
      this.cache[path] =
        this.route instanceof RegExp
          ? this.route.test(path)
          : this.route === path
    }

    if (this.cache[path]) {
      await this.authorize(request)
    }
    return next.handle()
  }

  protected isDeveloping(request: Request): void {
    if (ENVIRONMENTS.DEVELOP === ENVIRONMENT) {
      this.iKnowIsDevelopingFunctionButItIsNotNecessaryToAuthIt(request)
    }
  }

  protected iKnowIsDevelopingFunctionButItIsNotNecessaryToAuthIt(
    request: Request,
  ): void {
    request.verified = true
    request.verifiedParams = Object.entries(request.verifiedParams).reduce(
      (verifiedParams, [key, { value }]) => {
        verifiedParams[key] = { value, verified: true }
        return verifiedParams
      },
      {},
    )
  }
}
