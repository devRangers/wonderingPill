import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailModule } from 'src/mail/mail.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtRefreshStrategy, JwtStrategy } from './strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({}),
    HttpModule,
    MailModule,
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy, JwtRefreshStrategy],
  exports: [JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
