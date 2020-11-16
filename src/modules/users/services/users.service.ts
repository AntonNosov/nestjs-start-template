import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { getCustomRepository, InsertResult } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { QueryParams as QueryParamsInterface } from '../../../common/interfaces/query-params.interface'
import { EncryptionService } from '../../encryption/services/encryption.service'
import { UserQueryParams } from '../constants/QueryParams'
import { User } from '../entities/users.entity'
import { User as UserInterface } from '../interfaces/users.interface'
import { UserRepository } from '../repositories/user.repository'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly encryptionService: EncryptionService
  ) {
    this.userRepository = getCustomRepository(UserRepository)
  }

  static prepareQueryParams(queryParams: any) {
    const where = {}
    Object.keys(queryParams).forEach(param => {
      if (!UserQueryParams.includes(param)) return
      where[param] = queryParams[param]
    })
    return { ...queryParams, where }
  }

  findAll(queryParams: QueryParamsInterface): Promise<[ User[], number ]> {
    return this.userRepository.findAll(queryParams)
  }

  findById(id: number): Promise<User> {
    return this.userRepository.findById(id)
  }

  findByLoginToAuth(login: string): Promise<User> {
    return this.userRepository.findByLoginToAuth(login)
  }

  async createOne(user: UserInterface): Promise<InsertResult> {
    if (user.password) {
      user.passwordHash = await this.encryptionService.hash(user.password)
    }
    return this.userRepository.createOne(user)
  }

  async updateOne(userId: number, user: UserInterface): Promise<User> {
    if (user.password) {
      user.passwordHash = await this.encryptionService.hash(user.password)
    }
    return this.userRepository.updateOne(userId, user)
  }

  updateByLogin(login: string, user: UserInterface): Promise<User> {
    return this.userRepository.updateByLogin(login, user)
  }

  createOrUpdate(user: UserInterface, condition: object): Promise<User> {
    return this.userRepository.createOrUpdate(user, condition)
  }

  removeOne(userId: number): Promise<DeleteResult> {
    return this.userRepository.removeOne(userId)
  }
}