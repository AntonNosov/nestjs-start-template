import { UnauthorizedException } from '@nestjs/common'
import { EntityRepository, InsertResult, Repository } from 'typeorm'
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult'
import { QueryParams } from '../../../common/interfaces/query-params.interface'
import { User } from '../entities/users.entity'
import { User as UserInterface } from '../interfaces/users.interface'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private static updateUser(userRow: User, user: UserInterface): void {
    Object.keys(userRow).forEach(field => {
      if (!user[field]) return
      userRow[field] = user[field]
    })
    userRow.updatedAt = new Date()
  }

  findAll(query: QueryParams): Promise<[ User[], number ]> {
    return this.findAndCount(query)
  }

  findById(id: number): Promise<User> {
    return this.findOne(id)
  }

  findByLoginToAuth(login: string): Promise<User> {
    return this.createQueryBuilder()
      .addSelect('User.passwordHash')
      .where('User.login = :login', { login })
      .getOne()
  }

  createOne(user: UserInterface): Promise<InsertResult> {
    return this.insert(user)
  }

  async updateOne(userId: number, user: UserInterface): Promise<User> {
    const userRow = await this.findOne(userId)
    if (!userRow) throw new UnauthorizedException('User is not found')
    UserRepository.updateUser(userRow, user)
    return this.save(userRow)
  }

  async updateByLogin(login: string, user: UserInterface): Promise<User> {
    const userRow = await this.findOne({ login })
    if (!userRow) throw new UnauthorizedException('User is not found')
    UserRepository.updateUser(userRow, user)
    return this.save(userRow)
  }

  async createOrUpdate(user: UserInterface, condition: object): Promise<User> {
    const userRow = await this.findOne(condition)
    if (!userRow) return this.save(user)
    UserRepository.updateUser(userRow, user)
    return this.save(userRow)
  }

  removeOne(userId: number): Promise<DeleteResult> {
    return this.delete(userId)
  }
}