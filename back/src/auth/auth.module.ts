import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedisModule } from 'src/redis/redis.module';
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
    RedisModule,
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    JwtStrategy,
    JwtRefreshStrategy,
    KakaoStrategy,
    GoogleStrategy,
  ],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
