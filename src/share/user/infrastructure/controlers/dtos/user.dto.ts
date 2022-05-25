import * as Joi from 'joi'
import { JoiSchema } from 'nestjs-joi'

export const UserDtoClass = Symbol()

export class UserDto {
  @JoiSchema(Joi.string().uuid().required())
  id!: string

  @JoiSchema(Joi.string().required())
  email!: string

  @JoiSchema(Joi.string().required())
  password!: string
}
