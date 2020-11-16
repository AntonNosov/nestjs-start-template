import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { swaggerInit } from './swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)
  if (configService.get<string>('node') === 'development') {
    app.enableCors()
  }
  app.setGlobalPrefix('api')
  swaggerInit(app)
  await app.listen(configService.get<number>('port'))
}

bootstrap()