import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TwilioModule } from 'nestjs-twilio';
import { SmsService } from './sms.service';

@Global()
@Module({
  imports: [
    HttpModule,
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          accountSid: configService.get('SMS_ACCOUNT_ID'),
          authToken: configService.get('SMS_ACCOUNT_TOKEN'),
        };
      },
    }),
  ],
  providers: [SmsService],
  exports: [SmsService, TwilioModule],
})
export class SmsModule {}
