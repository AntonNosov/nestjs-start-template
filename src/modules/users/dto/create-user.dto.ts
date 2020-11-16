import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'
import { Roles } from '../constants/Roles'

export class CreateUserDto {
  @ApiProperty({ description: 'First name of user', required: true })
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ description: 'Last name of user', required: true })
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ description: 'Login of user', required: true })
  @IsNotEmpty()
  login: string

  @ApiProperty({ description: 'Email of user', required: false })
  email: string

  @ApiProperty({ description: 'Password of user', required: true })
  @IsNotEmpty()
  password: string

  @ApiProperty({ description: 'Role of user', required: true, enum: Roles })
  @IsNotEmpty()
  role: Roles

  @ApiProperty({ description: 'Photo of user', required: false })
  photo: string
}