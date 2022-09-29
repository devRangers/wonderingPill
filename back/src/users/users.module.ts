import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AgendaModule } from 'src/agenda/agenda.module';
import { AgendaService } from 'src/agenda/agenda.service';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { AlarmsService } from 'src/alarms/alarms.service';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { GcsModule } from 'src/gcs/gcs.module';
import { RedisModule } from 'src/redis/redis.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [GcsModule, AlarmsModule, RedisModule, AgendaModule],
  providers: [UsersService, AlarmsService, AgendaService],
  controllers: [UsersController],
  exports: [GcsModule, AlarmsModule, RedisModule, AgendaModule],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('users');
  }
}
