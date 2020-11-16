import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { compare, hash } from 'bcrypt'

@Injectable()
export class EncryptionService {
  constructor(private readonly config: ConfigService) {
  }

  hash(plain: string): Promise<string> {
    return hash(plain, this.config.get<number>('auth.hashRound'))
  }

  compare(plain: string, encrypted: string): Promise<boolean> {
    return compare(plain, encrypted)
  }
}