import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

export interface Response<T> {
  token: string;
}

@Injectable()
export class AuthInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private readonly authService: AuthService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const request = context.switchToHttp().getRequest()
        return { token: this.authService.createUserToken(request.body.user || data) }
      })
    )
  }
}