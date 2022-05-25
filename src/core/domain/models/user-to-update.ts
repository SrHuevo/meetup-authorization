import { UserToUpdate } from '../../../share/user/domain/models/user-to-update'

export class UserCoreToUpdate extends UserToUpdate<typeof UserCoreToUpdate> {
  toPrimitives(): ConstructorParameters<typeof UserCoreToUpdate> {
    return [
      {
        id: this.id.value,
        email: this.email.value,
        password: this.password.value,
      },
    ]
  }
}
