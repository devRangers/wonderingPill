import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from './mail.service';

@Module({
  imports: [HttpModule],
  providers: [MailService, PrismaService],
  exports: [MailService],
})
export class MailModule {}
