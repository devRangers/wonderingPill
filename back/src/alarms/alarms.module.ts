import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { FcmModule } from 'src/fcm/fcm.module';
import { FcmService } from 'src/fcm/fcm.service';
import { AlarmsController } from './alarms.controller';
import { AlarmsService } from './alarms.service';

@Module({
  imports: [FcmModule],
  providers: [AlarmsService, FcmService],
  controllers: [AlarmsController],
  exports: [FcmModule],
})
export class AlarmsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('alarms');
  }
}
