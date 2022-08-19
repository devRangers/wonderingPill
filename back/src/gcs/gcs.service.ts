import { Storage } from '@google-cloud/storage';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GcsService {
  constructor(private readonly configService: ConfigService) {}

  async getPresignedUrl(id: string): Promise<string> {
    const fileName = id + '_profile.png';
    const bucketName = 'wonderingpill-bucket/user_profileImg/';
    try {
      const storage = new Storage({
        keyFilename: `src/secure/${this.configService.get('GCS_KEY_FILE')}`,
      });

      const url = await storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
          action: 'write',
          version: 'v4',
          expires: Date.now() + 15 * 60 * 1000,
          contentType: 'application/octet-stream',
        });

      return url.pop();
    } catch (error) {
      throw new ForbiddenException(
        '외부 스토리지에서 signed url를 받아오지 못했습니다.',
      );
    }
  }
}
