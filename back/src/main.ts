import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters';
import { PrismaMongoService } from './prisma/prisma-mongo.service';
import { PrismaService } from './prisma/prisma.service';
import { setupSwagger } from './utils';
import { prefixConstant } from './utils/prefix.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(prefixConstant);

  const configService = app.get(ConfigService);
  const PORT = configService.get('SERVER_PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  const prismaMongoService = app.get(PrismaMongoService);
  await prismaMongoService.enableShutdownHooks(app);

  setupSwagger(app);
  app.enableCors({
    origin: `${configService.get('CLIENT_URL')}`,
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter()); // 전역 예외 필터

  await app.listen(PORT);

  if (configService.get('NODE_ENV') === 'development') {
    Logger.log(
      `Application running on port ${PORT}, http://localhost:${PORT}${prefixConstant}`,
    );
    Logger.log(
      `Go to API Docs : http://localhost:${PORT}${prefixConstant}/swagger`,
    );
  }
}
bootstrap();
