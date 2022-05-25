import * as Joi from 'joi'
import { JoiSchema } from 'nestjs-joi'

import { UserLoginDto } from '../../../../../share/user/infrastructure/controlers/dtos/user-login.dto'

export class UserCoreLoginDto extends UserLoginDto {
  @JoiSchema(Joi.string().required())
  otra!: string
}
