import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserResponse } from 'src/auth/dto';
import { HttpExceptionFilter } from 'src/common/filters/HttpExceptionFilter.filter';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  const authService = {
    createUser: () => CreateUserResponse,
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    })
      .overrideProvider(AuthService)
      .useValue(authService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('AUTH', () => {
    it('/auth/signup (POST)', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test@mail.com',
          name: 'tester',
          password: 'test123@',
          birth: '19900101',
          phone: '01000000000',
        })
        .expect(201);
    });

    it('return 400 error', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          email: 'test',
          name: 'tester',
          password: 'test12',
          birth: '10000101',
          phone: '010000000',
        })
        .expect(400)
        .expect({
          statusCode: 400,
          message: [
            'email must be an email',
            '비밀번호 양식에 맞게 작성하세요.',
            'password must be longer than or equal to 8 characters',
            '생년월일 양식에 맞게 작성하세요.',
            '휴대폰번호 양식에 맞게 작성하세요.',
          ],
          error: 'Bad Request',
        });
    });
  });
});
