import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AlarmsModule } from 'src/alarms/alarms.module';
import { AlarmsService } from 'src/alarms/alarms.service';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { AgendaModule } from 'src/infras/agenda/agenda.module';
import { AgendaService } from 'src/infras/agenda/agenda.service';
import { GcsModule } from 'src/infras/gcs/gcs.module';
import { RedisModule } from 'src/infras/redis/redis.module';
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
