import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { SmsService } from './sms.service';

@Global()
@Module({
  imports: [
    HttpModule,
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
