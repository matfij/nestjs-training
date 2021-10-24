import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions: NestApplicationOptions = {
    cors: true
  };
  const app = await NestFactory.create(AppModule, appOptions);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Car advisor')
    .build();
  const documentOptions: SwaggerDocumentOptions =  {
    // operationIdFactory: (controllerKey: string, methodKey: string) => methodKey
  };
  const document = SwaggerModule.createDocument(app, swaggerConfig, documentOptions);
  SwaggerModule.setup('docs', app, document);
    

  await app.listen(process.env.PORT);
}
bootstrap();
