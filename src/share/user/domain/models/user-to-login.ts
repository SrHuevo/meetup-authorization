import { AggregateRoot } from '../../../domain/models/aggregate-root'
import { Class } from '../../../infrastructure/typescript'
import { UserEmail } from './user-email'
import { UserPassword } from './user-password'

export const UserToLoginClass = Symbol()

export abstract class UserToLogin<U extends Class> extends AggregateRoot<U> {
  public email: UserEmail
  public password: UserPassword

  constructor(args: { email: string; password: string }) {
    super()
    this.email = new UserEmail(args.email)
    this.password = new UserPassword(args.password)
  }
}
