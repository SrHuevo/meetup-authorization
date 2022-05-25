import { Module } from '@nestjs/common'
import { RouterModule } from '@nestjs/core'
import { JoiPipeModule } from 'nestjs-joi'

import { CoreAuthorizersMiddleSymbol, CoreModule } from './core/core.module'
import { ShareAuthorizersMiddleSymbol, ShareModule } from './share/share.module'

export const AuthorizersMiddleSymbol = Symbol()

@Module({
  imports: [
    ShareModule,
    CoreModule,
    RouterModule.register([
      {
        path: 'core',
        module: CoreModule,
      },
    ]),
    JoiPipeModule.forRoot({
      pipeOpts: {
        defaultValidationOptions: {
          allowUnknown: false,
        },
        usePipeValidationException: true,
      },
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: AuthorizersMiddleSymbol,
      useFactory: (...authorizers) => authorizers.flat(),
      inject: [ShareAuthorizersMiddleSymbol, CoreAuthorizersMiddleSymbol],
    },
  ],
})
export class MainModule {}
