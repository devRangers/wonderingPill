import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FcmService } from './fcm.service';

@Module({
  providers: [FcmService],
  exports: [FcmService],
})
export class FcmModule {
  constructor(private readonly configService: ConfigService) {
    admin.initializeApp({
      credential: admin.credential.cert(
        `src/secure/${this.configService.get('FIREBASE_KEY_FILE')}`,
      ),
    });
  }
}
