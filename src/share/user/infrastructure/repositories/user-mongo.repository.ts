import { Inject } from '@nestjs/common'
import { Model } from 'mongoose'

import { UserClass } from '../../../../core/domain/models/user'
import { Class } from '../../../infrastructure/typescript'
import { User } from '../../domain/models/user'
import { UserEmail } from '../../domain/models/user-email'
import { UserHashedPassword } from '../../domain/models/user-hashed-password'
import { UserToCreate } from '../../domain/models/user-to-create'
import { UserToUpdate } from '../../domain/models/user-to-update'
import UserRepository from '../../domain/repository/user.repository'
import { UserModelSymbol } from './models/user.model'

export default class UserMongoRepository<U extends User<any>>
  implements UserRepository<U>
{
  constructor(
    @Inject(UserClass) private userClass: Class<U>,
    @Inject(UserModelSymbol) private userModel: Model<any>,
  ) {}

  async search({ email }: { email: UserEmail }): Promise<U> {
    const user = await this.userModel.findOne({ email }).exec()
    return new this.userClass(user)
  }

  async getHashedPassword({
    email,
  }: {
    email: UserEmail
  }): Promise<UserHashedPassword> {
    const { password } = await this.userModel
      .findOne({ email }, { password: 1 })
      .exec()
    return new UserHashedPassword(password)
  }

  async create({ user }: { user: UserToCreate<any> }): Promise<void> {
    await this.userModel.create(user)
  }

  async update({ user }: { user: UserToUpdate<any> }): Promise<void> {
    await this.userModel.updateOne(
      { id: user.id },
      { $set: user },
      { upsert: true, omitUndefined: true },
    )
  }
}
