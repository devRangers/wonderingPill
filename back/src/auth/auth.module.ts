import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { AlarmsService } from 'src/alarms/alarms.service';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { AgendaService } from 'src/infras/agenda/agenda.service';
import { MailModule } from 'src/infras/mail/mail.module';
import { RedisModule } from 'src/infras/redis/redis.module';
import { SmsModule } from 'src/infras/sms/sms.module';
import { PrismaService } from 'src/prisma/prisma.service';
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
    AlarmsModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    UsersService,
    AlarmsService,
    AgendaService,
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
