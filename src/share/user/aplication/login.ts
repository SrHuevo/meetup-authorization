import NotFoundError from '../../domain/models/errors/not-found.error'
import UnauthorizedError from '../../domain/models/errors/unauthorized.error'
import { Injectable } from '../../infrastructure/dependency-injection'
import { UseCase } from '../../infrastructure/interfaces/use-case'
import { User } from '../domain/models/user'
import { UserToLogin } from '../domain/models/user-to-login'
import Crypto from '../domain/ports/crypto.port'
import JWT from '../domain/ports/jwt.port'
import UserRepository from '../domain/repository/user.repository'

@Injectable()
export class Login<U extends User<any>>
  implements UseCase<[UserToLogin<any>], { token: string; user: U }>
{
  constructor(
    private userRepository: UserRepository<U>,
    private crypto: Crypto,
    private jwt: JWT<U>,
  ) {}

  async run({
    email,
    password,
  }: UserToLogin<any>): Promise<{ token: string; user: U }> {
    const passwordSaved = await this.userRepository.getHashedPassword({ email })
    if (!passwordSaved) {
      throw new NotFoundError('email', email.value)
    }

    if (!(await this.crypto.compare(password.value, passwordSaved.value))) {
      throw new UnauthorizedError()
    }

    const userSaved = await this.userRepository.search({ email })

    const token = await this.jwt.generate(userSaved)

    return { user: userSaved, token }
  }
}
