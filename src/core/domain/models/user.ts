import { User } from '../../../share/user/domain/models/user'

export const UserClass = Symbol()

export class UserCore extends User<typeof UserCore> {
  toPrimitives(): ConstructorParameters<typeof UserCore> {
    return [
      {
        id: this.id.value,
        email: this.email.value,
      },
    ]
  }
}
