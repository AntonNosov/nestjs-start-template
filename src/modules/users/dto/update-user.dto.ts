import { ApiProperty } from '@nestjs/swagger'
import { Roles } from '../constants/Roles'

export class UpdateUserDto {
  @ApiProperty({ description: 'First name of user', required: false })
  firstName: string

  @ApiProperty({ description: 'Last name of user', required: false })
  lastName: string

  @ApiProperty({ description: 'Login of user', required: false })
  login: string

  @ApiProperty({ description: 'Email of user', required: false })
  email: string

  @ApiProperty({ description: 'Password of user', required: false })
  password: string

  @ApiProperty({ description: 'Role of user', required: false })
  role: Roles

  @ApiProperty({ description: 'Photo of user', required: false })
  photo: string

  @ApiProperty({ description: 'Status of user', required: false })
  active: boolean
}