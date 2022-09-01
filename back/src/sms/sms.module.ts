import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MailModule } from 'src/mail/mail.module';
import { SmsService } from './sms.service';

@Module({
  imports: [
    HttpModule,
    MailModule,
    // TwilioModule.forRootAsync({
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     return {
    //       accountSid: configService.get('SMS_ACCOUNT_ID'),
    //       authToken: configService.get('SMS_ACCOUNT_TOKEN'),
    //     };
    //   },
    // }),
  ],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
