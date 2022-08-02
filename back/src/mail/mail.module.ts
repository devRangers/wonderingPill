import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
