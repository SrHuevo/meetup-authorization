import { AggregateRoot } from '../../../domain/models/aggregate-root'
import { Class } from '../../../infrastructure/typescript'
import { UserEmail } from './user-email'
import { UserId } from './user-id'
import { UserPassword } from './user-password'

export const UserToUpdateClass = Symbol()

export abstract class UserToUpdate<U extends Class> extends AggregateRoot<U> {
  public id: UserId
  public email: UserEmail
  public password: UserPassword

  constructor(args: { id: string; email?: string; password?: string }) {
    super()
    this.id = new UserId(args.id)
    this.email = new UserEmail(args.email, { required: false })
    this.password = new UserPassword(args.password, { required: false })
  }
}
