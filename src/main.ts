import { NestApplicationOptions } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: true
  };
  const app = await NestFactory.create(AppModule, options);

  await app.listen(process.env.PORT);
}
bootstrap();
