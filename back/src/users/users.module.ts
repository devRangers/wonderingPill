import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { GcsModule } from 'src/gcs/gcs.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [GcsModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [GcsModule],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
