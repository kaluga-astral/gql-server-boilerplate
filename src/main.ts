import { LogLevel } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

function getLogLevels(): LogLevel[] {
  if (process.env.NODE_ENV === 'production') {
    return ['error'];
  }

  return ['error', 'debug', 'warn', 'log', 'verbose'];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLogLevels(),
  });
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}

bootstrap();
