import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UtilsService } from '../../services/utils.service'
import { EncryptionService } from '../encryption/services/encryption.service'
import { User } from '../users/entities/users.entity'
import { UsersService } from '../users/services/users.service'
import { AuthController } from './controllers/auth.controller'
import { AuthService } from './services/auth.service'
import { JwtStrategy } from './strategies/jwt.strategy'
import { LocalStrategy } from './strategies/local.strategy'
import { YandexStrategy } from './strategies/yandex.strategy'

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
  controllers: [ AuthController ],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    YandexStrategy,
    ConfigService,
    EncryptionService,
    UtilsService
  ],
  exports: [ AuthService ]
})

export class AuthModule {
}