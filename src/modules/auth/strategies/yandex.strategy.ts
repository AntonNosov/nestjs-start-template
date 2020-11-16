import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import got from 'got'
import { User } from '../../users/entities/users.entity'
import { User as UserInterface } from '../../users/interfaces/users.interface'
import { UsersService } from '../../users/services/users.service'
import { YandexAuth, YandexUser } from '../interfaces/yandex-auth.interface'

@Injectable()
export class YandexStrategy implements YandexAuth {
  accessToken: string
  mailDomain: string

  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
  ) {
    this.mailDomain = this.configService.get<string>('yandex.mailDomain')
  }

  init({ accessToken }): void {
    this.accessToken = accessToken
  }

  async getUser(): Promise<User> {
    const preparedYandexUser = await this.getPreparedYandexUser()
    const user = await this.usersService.updateByLogin(preparedYandexUser.login, preparedYandexUser)
    if (!user) throw new NotFoundException('User is not found.')
    return user
  }

  async createOrUpdateUser(): Promise<User> {
    const preparedYandexUser = await this.getPreparedYandexUser()
    const user = await this.usersService.createOrUpdate(preparedYandexUser, { login: preparedYandexUser.login })
    delete user.passwordHash
    return user
  }

  private async getPreparedYandexUser(): Promise<UserInterface> {
    const yandexUser = await this.getUserByAccessToken()
    if (yandexUser.default_email.split('@').pop() !== this.mailDomain) {
      throw new ForbiddenException('Mail domain is not valid for system.')
    }
    return {
      firstName: yandexUser.first_name,
      lastName: yandexUser.last_name,
      login: yandexUser.login,
      email: yandexUser.default_email
    }
  }

  private async getUserByAccessToken(): Promise<YandexUser> {
    const response: any = await got.get('https://login.yandex.ru/info?format=json', {
      headers: { 'Authorization': `Bearer ${ this.accessToken }` },
      responseType: 'json'
    })
    return response.body
  }
}