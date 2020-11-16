import { Body, Controller, Post, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { QueryFailedExceptionFilter } from '../../../common/exception-filters/query-failed.exception-filter'
import { AuthGuard } from '../../../common/guards/auth.guard'
import { User } from '../../users/entities/users.entity'
import { AuthServices } from '../constants/auth.constants'
import { LocalAuthDto } from '../dto'
import { YandexAuthDto } from '../dto/yandex-auth.dto'
import { AuthInterceptor } from '../interceptors/auth.interceptor'
import { AuthService } from '../services/auth.service'

@Controller()
@ApiTags('Auth')
@UseInterceptors(AuthInterceptor)
@UseFilters(QueryFailedExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('v1/auth/local')
  @UseGuards(AuthGuard)
  authLocal(@Body() localAuth: LocalAuthDto) {
  }

  @Post('v1/auth/yandex')
  @UseGuards(AuthGuard)
  authYandex(@Body() yandexAuth: YandexAuthDto) {
  }

  @Post('v1/auth/yandex/register')
  registerYandex(@Body() yandexAuth: YandexAuthDto): Promise<User> {
    return this.authService.register(yandexAuth, AuthServices.YANDEX)
  }
}