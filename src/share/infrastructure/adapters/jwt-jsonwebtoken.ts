import { JwtPayload, sign, verify } from 'jsonwebtoken'

import { User } from '../../user/domain/models/user'
import JWT from '../../user/domain/ports/jwt.port'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../env'
import { Class } from '../typescript'

export default class JwtJsonwebtoken<U extends User<any>> implements JWT<U> {
  constructor(private UserClass: Class<U>) {}

  async generate(user: U): Promise<string> {
    return sign({ user: user.toPrimitives() }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
  }
  async verifyAndDecode(token: string): Promise<U> {
    const payload = verify(token, JWT_SECRET) as JwtPayload
    return new this.UserClass(payload)
  }
}
