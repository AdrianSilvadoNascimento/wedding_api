import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import * as bodyParser from 'body-parser';

import { AppModule } from './app.module';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(env.PORT ?? 3000);
  console.log(`Application is running on: ${env.PORT ?? 3000}`);
}

bootstrap();
