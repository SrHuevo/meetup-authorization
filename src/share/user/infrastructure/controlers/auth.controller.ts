import { Body, Controller, HttpStatus, Inject, Post, Res } from '@nestjs/common'
import { getClassSchema, JoiPipeValidationException } from 'nestjs-joi'

import UnauthorizedError from '../../../domain/models/errors/unauthorized.error'
import { Response } from '../../../infrastructure/http'
import { Class } from '../../../infrastructure/typescript'
import { Login } from '../../aplication/login'
import { Register } from '../../aplication/register'
import { User } from '../../domain/models/user'
import {
  UserToCreate,
  UserToCreateClass,
} from '../../domain/models/user-to-create'
import {
  UserToLogin,
  UserToLoginClass,
} from '../../domain/models/user-to-login'
import { UserDto, UserDtoClass } from './dtos/user.dto'
import { UserLoginDto, UserLoginDtoClass } from './dtos/user-login.dto'

@Controller('auth')
export class AuthController<U extends User<any>> {
  constructor(
    @Inject(UserDtoClass) private userDtoClass: Class<UserDto>,
    @Inject(UserLoginDtoClass) private userLoginDtoClass: Class<UserLoginDto>,
    @Inject(UserToLoginClass)
    private userToLoginClass: Class<UserToLogin<any>>,
    @Inject(UserToCreateClass)
    private userToCreateClass: Class<UserToCreate<any>>,
    private loginUseCase: Login<U>,
    private registerUseCase: Register,
  ) {}

  @Post('login')
  async login(
    @Body() userDto: UserLoginDto,
    @Res() response: Response,
  ): Promise<void> {
    const validate = getClassSchema(this.userLoginDtoClass).validate(userDto)
    if (validate.error) {
      throw new JoiPipeValidationException(validate.error.message)
    }
    try {
      const userLogin = new this.userToLoginClass(userDto)
      const { token, user } = await this.loginUseCase.run(userLogin)
      response.cookie('auth', token)
      response.send(user.toPrimitives())
    } catch (e) {
      console.error(e)
      throw new UnauthorizedError()
    }
  }

  @Post('register')
  async register(@Body() userDto: UserDto, @Res() response: Response) {
    getClassSchema(this.userDtoClass).valid(userDto)
    const user = new this.userToCreateClass(userDto)
    await this.registerUseCase.run(user)
    response.status(HttpStatus.NO_CONTENT).send()
  }

  @Post('logout')
  logout(@Res() response: Response) {
    response.clearCookie('auth')
    response.status(HttpStatus.NO_CONTENT).send()
  }
  /*

  @Post('refresh')
  refresh(): string {
    return this.appService.getHello()
  }

  @Post('remember-password')
  changePassword(): string {
    return this.appService.getHello()
  }

  @Post('change-password')
  changePassword(): string {
    return this.appService.getHello()
  }
 */
}
