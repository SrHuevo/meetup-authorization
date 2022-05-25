import { Module } from '@nestjs/common'

export const ShareAuthorizersMiddleSymbol = Symbol()

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: ShareAuthorizersMiddleSymbol,
      useFactory: (...authorizers) => authorizers,
      inject: [],
    },
  ],
  exports: [ShareAuthorizersMiddleSymbol],
})
export class ShareModule {}
