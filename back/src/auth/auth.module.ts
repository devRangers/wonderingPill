import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy';
import { JwtModule } from '@nestjs/jwt';
import * as config from 'config';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || config.get('jwt').secret,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRESIN || config.get('jwt').expiresIn,
      },
    }),
    HttpModule
  ],
  controllers: [AuthController],
  providers: [PrismaService, AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {}
