import { Module } from '@nestjs/common';
import { FcmModule } from 'src/infras/fcm/fcm.module';
import { FcmService } from 'src/infras/fcm/fcm.service';
import { AgendaService } from './agenda.service';

@Module({
  imports: [FcmModule],
  providers: [AgendaService, FcmService],
  exports: [FcmModule],
})
export class AgendaModule {}
