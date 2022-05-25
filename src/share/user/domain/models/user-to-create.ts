import { AggregateRoot } from '../../../domain/models/aggregate-root'
import { Class } from '../../../infrastructure/typescript'
import { UserEmail } from './user-email'
import { UserId } from './user-id'
import { UserPassword } from './user-password'

export const UserToCreateClass = Symbol()

export abstract class UserToCreate<U extends Class> extends AggregateRoot<U> {
  public id: UserId
  public email: UserEmail
  public password: UserPassword

  constructor(args: { id: string; email: string; password: string }) {
    super()
    this.id = new UserId(args.id)
    this.email = new UserEmail(args.email)
    this.password = new UserPassword(args.password)
  }
}
