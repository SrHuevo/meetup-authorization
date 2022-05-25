import { UserToCreate } from '../../../share/user/domain/models/user-to-create'

export class UserCoreToCreate extends UserToCreate<typeof UserCoreToCreate> {
  toPrimitives(): ConstructorParameters<typeof UserCoreToCreate> {
    return [
      {
        id: this.id.value,
        email: this.email.value,
        password: this.password.value,
      },
    ]
  }
}
