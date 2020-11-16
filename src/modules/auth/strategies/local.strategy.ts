import { ForbiddenException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EncryptionService } from '../../encryption/services/encryption.service'
import { User } from '../../users/entities/users.entity'
import { UsersService } from '../../users/services/users.service'
import { LocalAuth } from '../interfaces/local-auth.interface'

@Injectable()
export class LocalStrategy implements LocalAuth {
  login: string
  password: string

  constructor(
    private readonly usersService: UsersService,
    private readonly encryptionService: EncryptionService
  ) {
  }

  init({ login, password }): void {
    this.login = login
    this.password = password
  }

  async getUser(): Promise<User> {
    const user = await this.usersService.findByLoginToAuth(this.login)
    if (!user) throw new NotFoundException('User is not found.')
    if (!user.active) throw new ForbiddenException('User is not active.')
    await this.verifyUser(user.passwordHash)
    delete user.passwordHash
    return user
  }

  async verifyUser(passwordHash: string): Promise<void> {
    const isVerifiedPassword = await this.encryptionService.compare(this.password, passwordHash)
    if (!isVerifiedPassword) throw new UnprocessableEntityException('Incorrect access data.')
  }
}