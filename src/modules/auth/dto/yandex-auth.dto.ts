import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class YandexAuthDto {
  @ApiProperty({ description: 'Yandex client access_token', required: true })
  @IsNotEmpty()
  accessToken: string
}