import { Inject } from '@nestjs/common'

import { UseCase } from '../../infrastructure/interfaces/use-case'
import { Class } from '../../infrastructure/typescript'
import { User } from '../domain/models/user'
import {
  UserToCreate,
  UserToCreateClass,
} from '../domain/models/user-to-create'
import Crypto from '../domain/ports/crypto.port'
import UserRepository from '../domain/repository/user.repository'

export class Register implements UseCase<[UserToCreate<any>], void> {
  constructor(
    @Inject(UserToCreateClass)
    private userToCreateClass: Class<UserToCreate<any>>,
    private userRepository: UserRepository<User<any>>,
    private crypto: Crypto,
  ) {}

  async run(user: UserToCreate<any>): Promise<void> {
    const hashedPassword = await this.crypto.generate(user.password.value)
    const userPrimitives = user.toPrimitives()[0]
    const userWithHashedPassword = new this.userToCreateClass({
      ...(userPrimitives as any),
      password: hashedPassword,
    })
    await this.userRepository.create({ user: userWithHashedPassword })
  }
}
