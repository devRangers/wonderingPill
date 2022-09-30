import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { AgendaModule } from 'src/infras/agenda/agenda.module';
import { AgendaService } from 'src/infras/agenda/agenda.service';
import { AlarmsController } from './alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  imports: [AgendaModule],
  providers: [AlarmsService, AgendaService],
  controllers: [AlarmsController],
  exports: [AgendaModule],
})
export class AlarmsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('alarms');
  }
}
