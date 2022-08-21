import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { FcmService } from './fcm.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {}
