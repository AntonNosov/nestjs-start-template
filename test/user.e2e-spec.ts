import { INestApplication } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as request from 'supertest'
import configuration from '../src/config/configuration'
import { UsersService } from '../src/modules/users/services/users.service'
import { UsersModule } from '../src/modules/users/users.module'

describe('Users', () => {
  let app: INestApplication
  let usersService = { findAll: () => [ 'test' ] }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          keepConnectionAlive: true
        }),
        ConfigModule.forRoot({
          load: [ configuration ]
        }),
        UsersModule
      ]
    })
      .overrideProvider(UsersService)
      .useValue(usersService)
      .compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/GET users. You will get 401 "Unauthorized"', () => {
    return request(app.getHttpServer())
      .get('v1/users')
      .expect(401)
  })

  it('/POST auth/local', () => {
    return request(app.getHttpServer())
      .post('v1/auth/local')
      .send({ login: process.env.SUPER_ADMIN_DATABASE_LOGIN, password: process.env.SUPER_ADMIN_DATABASE_PASSWORD })
      .expect(200)
  })

  afterAll(async () => {
    await app.close()
  })
})