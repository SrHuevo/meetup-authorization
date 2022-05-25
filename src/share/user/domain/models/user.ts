import { AggregateRoot } from '../../../domain/models/aggregate-root'
import { Class } from '../../../infrastructure/typescript'
import { UserEmail } from './user-email'
import { UserId } from './user-id'

export abstract class User<C extends Class> extends AggregateRoot<C> {
  public id: UserId
  public email: UserEmail

  constructor(args: { id: string; email: string }) {
    super()
    this.id = new UserId(args.id)
    this.email = new UserEmail(args.email)
  }
}
