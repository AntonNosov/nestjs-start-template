import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export function swaggerInit(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('nestjs-start-template')
    .setDescription('nestjs-start-template')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/api-docs', app, document)
}