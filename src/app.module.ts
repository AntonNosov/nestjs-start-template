import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import configuration from './config/configuration'
import { AuthModule } from './modules/auth/auth.module'
import { EncryptionModule } from './modules/encryption/encryption.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot({
      load: [ configuration ]
    }),
    AuthModule,
    UsersModule,
    EncryptionModule
  ],
  controllers: [],
  providers: []
})

export class AppModule {
}