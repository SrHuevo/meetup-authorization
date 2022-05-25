import { UserToLogin } from '../../../share/user/domain/models/user-to-login'

export class UserCoreToLogin extends UserToLogin<typeof UserCoreToLogin> {
  toPrimitives(): ConstructorParameters<typeof UserCoreToLogin> {
    return [
      {
        email: this.email.value,
        password: this.password.value,
      },
    ]
  }
}
