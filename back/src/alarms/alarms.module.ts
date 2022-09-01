import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { FcmModule } from 'src/fcm/fcm.module';
import { AlarmsController } from './alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  imports: [FcmModule],
  providers: [AlarmsService],
  controllers: [AlarmsController],
})
export class AlarmsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('alarms');
  }
}
