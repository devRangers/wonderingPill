import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { AlarmsService } from 'src/alarms/alarms.service';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { GcsModule } from 'src/gcs/gcs.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [GcsModule, AlarmsModule],
  providers: [UsersService, AlarmsService],
  controllers: [UsersController],
  exports: [GcsModule, AlarmsModule],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
