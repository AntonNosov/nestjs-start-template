import { Injectable } from '@nestjs/common'
import { User } from '../../users/entities/users.entity'
import { AuthServices, AuthType } from '../constants/auth.constants'
import { LocalAuth } from '../interfaces/local-auth.interface'
import { YandexAuth } from '../interfaces/yandex-auth.interface'
import { JwtStrategy } from '../strategies/jwt.strategy'
import { LocalStrategy } from '../strategies/local.strategy'
import { YandexStrategy } from '../strategies/yandex.strategy'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtStrategy: JwtStrategy,
    private readonly localStrategy: LocalStrategy,
    private readonly yandexStrategy: YandexStrategy
  ) {
  }

  get strategy(): object {
    return {
      [AuthServices.LOCAL]: this.localStrategy,
      [AuthServices.YANDEX]: this.yandexStrategy
    }
  }

  async validateRequest(authData: LocalAuth | YandexAuth | any, service: AuthType): Promise<boolean> {
    await this.strategy[service].init(authData)
    const user = await this.strategy[service].getUser()
    authData.user = user
    return !!user
  }

  async register(authData: LocalAuth | YandexAuth | any, service: AuthType): Promise<User> {
    await this.strategy[service].init(authData)
    return this.strategy[service].createOrUpdateUser()
  }

  createUserToken(user: User): string {
    return this.jwtStrategy.createToken({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      login: user.login
    })
  }
}