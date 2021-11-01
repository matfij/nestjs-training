import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * Applicatio instance
   */
  const appOptions: NestApplicationOptions = {
    cors: true
  };
  const app = await NestFactory.create(AppModule, appOptions);

  /**
   * Swagger documentation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Car advisor')
    .addCookieAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig, {});
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
