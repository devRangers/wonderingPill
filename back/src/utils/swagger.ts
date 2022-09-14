import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const options = new DocumentBuilder()
    .setTitle('WonderingPill API Docs')
    .setDescription('WonderingPill API description')
    .setVersion('1.0.0')
    .addCookieAuth(
      'auth-cookie',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'accessToken',
    )
    .addCookieAuth(
      'auth-cookie',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'refreshToken',
    )
    .build();

  const swaggerCustomOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
    },
  };

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document, swaggerCustomOptions);
}
