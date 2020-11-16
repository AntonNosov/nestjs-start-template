import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EncryptionService } from './services/encryption.service'

@Module({
  providers: [ EncryptionService, ConfigService ],
  exports: [ EncryptionService ]
})
export class EncryptionModule {
}