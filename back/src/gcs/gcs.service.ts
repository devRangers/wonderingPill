import { Storage } from '@google-cloud/storage';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectThrottlerStorage } from '@nestjs/throttler';

@Injectable()
export class GcsService {
  constructor(
    private readonly configService: ConfigService,
    @InjectThrottlerStorage() private readonly storage: Storage,
  ) {
    this.storage = new Storage({
      keyFilename: `src/secure/${this.configService.get('GCS_KEY_FILE')}`,
    });
  }

  async getPresignedUrl(id: string) {
    const fileName =
      '_' + new Date(Date.now()).getTime() + '_' + id + '_profile.png';
    const bucketName = 'wonderingpill-bucket/user_profileImg/';
    try {
      const url = await this.storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
          action: 'write',
          version: 'v4',
          expires: Date.now() + 15 * 60 * 1000,
          contentType: 'application/octet-stream',
        });

      return { url: url.pop(), fileName };
    } catch (error) {
      throw new ForbiddenException(
        '외부 스토리지에서 signed url를 받아오지 못했습니다.',
      );
    }
  }

  async deleteImg(oldDate: string, id: string) {
    const fileName = '_' + oldDate + '_' + id + '_profile.png';
    const bucketName = 'wonderingpill-bucket/user_profileImg/';

    try {
      await this.storage.bucket(bucketName).file(fileName).delete({
        ignoreNotFound: true,
      });
    } catch (error) {
      throw new ForbiddenException(
        '외부 스토리지에서 이미지를 삭제하지 못했습니다.',
      );
    }
  }
}
