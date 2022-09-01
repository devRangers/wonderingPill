import { HttpModule } from '@nestjs/axios';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/middlewares/LoggerMiddleware';
import { PillController } from './pill.controller';
import { PillService } from './pill.service';

@Module({
  imports: [HttpModule],
  providers: [PillService],
  controllers: [PillController],
})
export class PillModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('pill');
  }
}
