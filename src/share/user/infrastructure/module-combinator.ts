import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface'
import { Model } from 'mongoose'

import { UserClass } from '../../../core/domain/models/user'
import CryptoBcrypt from '../../infrastructure/adapters/crypto-bcrypt'
import JwtJsonwebtoken from '../../infrastructure/adapters/jwt-jsonwebtoken'
import { Class } from '../../infrastructure/typescript'
import { Login } from '../aplication/login'
import { Register } from '../aplication/register'
import { User } from '../domain/models/user'
import {
  UserToCreate,
  UserToCreateClass,
} from '../domain/models/user-to-create'
import { UserToLogin, UserToLoginClass } from '../domain/models/user-to-login'
import {
  UserToUpdate,
  UserToUpdateClass,
} from '../domain/models/user-to-update'
import Crypto from '../domain/ports/crypto.port'
import JWT from '../domain/ports/jwt.port'
import UserRepository from '../domain/repository/user.repository'
import { AuthController } from './controlers/auth.controller'
import { UserDto, UserDtoClass } from './controlers/dtos/user.dto'
import {
  UserLoginDto,
  UserLoginDtoClass,
} from './controlers/dtos/user-login.dto'
import { UserModelSymbol } from './repositories/models/user.model'
import UserMongoRepository from './repositories/user-mongo.repository'

export const addUserDependencies = (
  module: ModuleMetadata,
  {
    userClass,
    userToLoginClass,
    userToCreateClass,
    userToUpdateClass,
    userDtoClass,
    userLoginDtoClass,
    userModel,
  }: {
    userClass: Class<User<any>>
    userToLoginClass: Class<UserToLogin<any>>
    userToCreateClass: Class<UserToCreate<any>>
    userToUpdateClass: Class<UserToUpdate<any>>
    userDtoClass: Class<UserDto>
    userLoginDtoClass: Class<UserLoginDto>
    userModel: Model<any>
  },
): ModuleMetadata => {
  return {
    imports: [...module.imports],
    controllers: [...module.controllers, AuthController],
    providers: [
      ...module.providers,
      { provide: UserRepository, useClass: UserMongoRepository },
      { provide: Crypto, useClass: CryptoBcrypt },
      { provide: JWT, useClass: JwtJsonwebtoken },
      Login,
      Register,

      { provide: UserClass, useFactory: () => userClass },
      { provide: UserToLoginClass, useFactory: () => userToLoginClass },
      { provide: UserToUpdateClass, useFactory: () => userToCreateClass },
      { provide: UserToCreateClass, useFactory: () => userToUpdateClass },
      { provide: UserDtoClass, useFactory: () => userDtoClass },
      { provide: UserLoginDtoClass, useFactory: () => userLoginDtoClass },
      { provide: UserModelSymbol, useFactory: () => userModel },
    ],
    exports: [...module.exports],
  }
}
