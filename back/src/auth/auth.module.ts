import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { MailModule } from 'src/mail/mail.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
import { SmsModule } from 'src/sms/sms.module';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy, KakaoStrategy } from './strategy';
import { GoogleStrategy } from './strategy/google.strategy';

@Module({
  imports: [
    PassportModule.register({
      accessType: 'offline',
      prompt: 'consent',
      approval_prompt: 'force',
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({}),
    HttpModule,
    SmsModule,
    MailModule,
    RedisModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UsersService,
    JwtStrategy,
    JwtRefreshStrategy,
    KakaoStrategy,
    GoogleStrategy,
  ],
  exports: [RedisModule, JwtModule],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('auth');
  }
}
