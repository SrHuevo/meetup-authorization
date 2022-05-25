import './share/infrastructure/env'
import './share/infrastructure/repositories/mongo-connection'

import { NestFactory } from '@nestjs/core'

import { AuthorizersMiddleSymbol, MainModule } from './main.module'
import { ExpectedErrorFilter } from './share/infrastructure/filters/expected-error.filter'
import { JoiValidationErrorFilter } from './share/infrastructure/filters/joi-validation-error.filter'
import { UnexpectedErrorFilter } from './share/infrastructure/filters/unexpected-error.filter'
import { AuthorizerFinalInterceptor } from './share/infrastructure/interceptors/authorizer-final.interceptor'
import { AuthorizerInitialInterceptor } from './share/infrastructure/interceptors/authorizer-initial.interceptor'
import { AuthorizerMiddleInterceptor } from './share/infrastructure/interceptors/authorizer-middle.interceptor'
import { AuthenticateInterceptor } from './share/user/infrastructure/interceptors/authenticate.interceptor'

const bootstrap = async () => {
  const app = await NestFactory.create(MainModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  })

  app.useGlobalInterceptors(new AuthenticateInterceptor())

  app.useGlobalInterceptors(new AuthorizerInitialInterceptor())
  const authorizerMiddleInterceptors = await app.resolve<
    AuthorizerMiddleInterceptor[]
  >(AuthorizersMiddleSymbol)
  app.useGlobalInterceptors(...authorizerMiddleInterceptors)
  app.useGlobalInterceptors(new AuthorizerFinalInterceptor())

  app.useGlobalFilters(new UnexpectedErrorFilter())
  app.useGlobalFilters(new JoiValidationErrorFilter())
  app.useGlobalFilters(new ExpectedErrorFilter())

  await app.listen(3000)
}
bootstrap()
