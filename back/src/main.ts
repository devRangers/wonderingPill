import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { HttpExceptionFilter } from './pipes/HttpExceptionFilter.filter';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : process.env.NODE_ENV === 'stage'
      ? '.env'
      : '.development.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 어떤 decorator도 없는 property의 object 제외
      forbidNonWhitelisted: true, // 이상한걸 보내면 request를 막음
      transform: true, // 원하는 타입으로 변환
    }),
  );

  // PORT 설정
  const PORT = process.env.SERVER_PORT || config.get('server').port;
  app.enableCors(); // CORS 설정
  app.useGlobalFilters(new HttpExceptionFilter()); // 전역 예외 필터
  await app.listen(PORT);
  
  Logger.log(`Application running on port ${PORT}`);
}
bootstrap();
