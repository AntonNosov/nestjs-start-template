import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '../../users/entities/users.entity'
import { User as UserInterface } from '../../users/interfaces/users.interface'
import { UsersService } from '../../users/services/users.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('auth.jwtSecret')
    })
  }

  createToken(payload: object): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('auth.jwtSecret'),
      expiresIn: Number(this.configService.get<number>('auth.jwtMaxAge')),
      algorithm: 'HS256'
    })
  }

  validate(user: UserInterface): Promise<User> {
    return this.usersService.findById(user.id)
  }
}