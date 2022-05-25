import * as Joi from 'joi'
import { JoiSchema } from 'nestjs-joi'

export const UserLoginDtoClass = Symbol()

export class UserLoginDto {
  @JoiSchema(Joi.string().required())
  email!: string

  @JoiSchema(Joi.string().required())
  password!: string
}
