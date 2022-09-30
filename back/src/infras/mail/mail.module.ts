import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Module({
  providers: [MailService],
  imports: [HttpModule],
  exports: [MailService],
})
export class MailModule {}
