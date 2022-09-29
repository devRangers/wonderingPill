import { Storage } from '@google-cloud/storage';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectThrottlerStorage } from '@nestjs/throttler';
import { GetPresignedUrlResponse } from 'src/users/dto';

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

  /** 현재 로그인된 user id로 Presigned Url 발급 */
  async getPresignedUrl(id: string): Promise<GetPresignedUrlResponse> {
    // gcs bucket과 파일 이름 선언
    const bucketName = 'wonderingpill-bucket/user_profileImg/';
    const fileName = `_${new Date(Date.now()).getTime()}_${id}_profile.png`;

    try {
      /** gcs에 Presigned Url 요청 */
      const url: string[] = await this.storage
        .bucket(bucketName)
        .file(fileName)
        .getSignedUrl({
          action: 'write', // Presigned URL을 '생성'
          version: 'v4', // 서명 방식, 만료시간 7일 초과 불과
          expires: Date.now() + 15 * 60 * 1000, // 만료시간 15분
          contentType: 'application/octet-stream', // 일반적인 8bit 파일
        });

      return { url: url[0], fileName };
    } catch (error) {
      throw new NotFoundException(
        '외부 스토리지에서 Presigned Url를 발급하지 못했습니다.',
      );
    }
  }

  /** 현재 로그인된 user id와 이전 파일이름에 포함되었던 Date로 Presigned Url 발급 */
  async deleteImg(oldDate: string, id: string) {
    // gcs bucket과 파일 이름 선언
    const fileName = `_${oldDate}_${id}_profile.png`;
    const bucketName = 'wonderingpill-bucket/user_profileImg/';

    try {
      await this.storage.bucket(bucketName).file(fileName).delete({
        ignoreNotFound: true,
      });
    } catch (error) {
      throw new NotFoundException(
        '외부 스토리지에서 프로필 이미지를 삭제하지 못했습니다.',
      );
    }
  }
}
