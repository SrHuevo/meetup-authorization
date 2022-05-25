import { User } from '../models/user'
import { UserEmail } from '../models/user-email'
import { UserHashedPassword } from '../models/user-hashed-password'
import { UserToCreate } from '../models/user-to-create'
import { UserToUpdate } from '../models/user-to-update'

export default abstract class UserRepository<U extends User<any>> {
  abstract search(args: { email: UserEmail }): Promise<U>
  abstract getHashedPassword(args: {
    email: UserEmail
  }): Promise<UserHashedPassword>
  abstract create(args: { user: UserToCreate<any> }): Promise<void>
  abstract update(args: { user: UserToUpdate<any> }): Promise<void>
}
