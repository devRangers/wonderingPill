import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FcmService } from './fcm.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {
  constructor(private readonly configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        `src/secure/${this.configService.get('FIREBASE_KEY_FILE')}`,
      ),
      databaseURL: this.configService.get('FIREBASE_DB_URL'),
    });
  }
}
