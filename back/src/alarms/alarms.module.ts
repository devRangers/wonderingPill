import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AgendaModule } from 'src/agenda/agenda.module';
import { AgendaService } from 'src/agenda/agenda.service';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
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
