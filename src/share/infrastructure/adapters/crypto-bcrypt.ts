import { Injectable } from '@nestjs/common'
import { compare, hash } from 'bcryptjs'

import Crypto from '../../user/domain/ports/crypto.port'

@Injectable()
export default class CryptoBcrypt implements Crypto {
  generate(password: string): Promise<string> {
    return hash(password, 10)
  }

  compare(clearPassword: string, hashPassword: string): Promise<boolean> {
    return compare(clearPassword, hashPassword)
  }
}
