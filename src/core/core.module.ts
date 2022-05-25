import { Module } from '@nestjs/common'

import { addUserDependencies } from '../share/user/infrastructure/module-combinator'
import { UserCore } from './domain/models/user'
import { UserCoreToCreate } from './domain/models/user-to-create'
import { UserCoreToLogin } from './domain/models/user-to-login'
import { UserCoreToUpdate } from './domain/models/user-to-update'
import { userCoreModel } from './domain/repositories/models/user.model'
import { UserCoreDto } from './infrastructure/controlers/auth/dtos/user.dto'
import { UserCoreLoginDto } from './infrastructure/controlers/auth/dtos/user-login.dto'

export const CoreAuthorizersMiddleSymbol = Symbol()

@Module(
  addUserDependencies(
    {
      imports: [],
      controllers: [],
      providers: [
        {
          provide: CoreAuthorizersMiddleSymbol,
          useFactory: (...authorizers) => authorizers,
          inject: [],
        },
      ],
      exports: [CoreAuthorizersMiddleSymbol],
    },
    {
      userClass: UserCore,
      userToLoginClass: UserCoreToLogin,
      userToCreateClass: UserCoreToCreate,
      userToUpdateClass: UserCoreToUpdate,
      userDtoClass: UserCoreDto,
      userLoginDtoClass: UserCoreLoginDto,
      userModel: userCoreModel,
    },
  ),
)
export class CoreModule {}
