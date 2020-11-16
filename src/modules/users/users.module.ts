import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthService } from '../auth/services/auth.service'
import { JwtStrategy } from '../auth/strategies/jwt.strategy'
import { LocalStrategy } from '../auth/strategies/local.strategy'
import { YandexStrategy } from '../auth/strategies/yandex.strategy'
import { EncryptionService } from '../encryption/services/encryption.service'
import { UsersController } from './controllers/users.controller'
import { User } from './entities/users.entity'
import { UsersService } from './services/users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([ User ]),
    JwtModule.registerAsync({
        imports: [ ConfigModule ],
        useFactory: (configService: ConfigService) => ({
          secret: configService.get<string>('jwtSecret'),
          signOptions: { expiresIn: configService.get<number>('jwtMaxAge') }
        }),
        inject: [ ConfigService ]
      }
    )
  ],
  controllers: [ UsersController ],
  providers: [
    UsersService,
    AuthService,
    JwtStrategy,
    LocalStrategy,
    YandexStrategy,
    EncryptionService,
    ConfigService
  ],
  exports: [ UsersService ]
})

export class UsersModule {
}