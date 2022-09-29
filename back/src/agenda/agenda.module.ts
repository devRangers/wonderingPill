import { Module } from '@nestjs/common';
import { FcmModule } from 'src/fcm/fcm.module';
import { FcmService } from 'src/fcm/fcm.service';
import { AgendaService } from './agenda.service';

@Module({
  imports: [FcmModule],
  providers: [AgendaService, FcmService],
  exports: [FcmModule],
})
export class AgendaModule {}
