import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';

@Global()
@Module({
  providers: [MailService],
  imports: [HttpModule],
  exports: [MailService],
})
export class MailModule {}
