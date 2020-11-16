import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class LocalAuthDto {
  @ApiProperty({ description: 'User email', required: true })
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'User password', required: true })
  @IsNotEmpty()
  password: string
}