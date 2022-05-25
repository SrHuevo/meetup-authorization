import { User } from '../models/user'

export default abstract class JWT<U extends User<any>> {
  abstract generate(userData: U): Promise<string>
  abstract verifyAndDecode(token): Promise<U>
}
