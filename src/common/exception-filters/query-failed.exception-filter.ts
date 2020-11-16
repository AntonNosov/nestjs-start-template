import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { QueryFailedError } from 'typeorm'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response: any = context.getResponse<Response>()
    const { detail, message } = exception
    const errorResponse = {
      statusCode: 422,
      message: detail || message
    }
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errorResponse)
  }
}