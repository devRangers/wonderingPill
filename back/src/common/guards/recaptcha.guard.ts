import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';

@Injectable()
export class RecapchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<any> {
    const { body } = context.switchToHttp().getRequest();
    const { data } = await this.httpService
      .post(
        `${process.env.RECAPTCHA_V3_PUBLIC_URL}?secret=${process.env.RECAPTCHA_V3_SECRETKEY}&response=${body.recaptchaValue}`,
      )
      .toPromise();

    if (!data.success || !data) {
      throw new ForbiddenException('recaptcha-v3 인증 요청에 실패하였습니다.');
    }

    if (data.score < 0.8) {
      throw new UnauthorizedException(
        '의심스러운 트래픽 활동이 감지되었습니다.',
      );
    }

    return {
      statusCode: 200,
      message: '정상적인 트래픽 활동입니다.',
      recaptchav3: { result: true },
    };
  }
}

export const RecapchaAuth = () => UseGuards(RecapchaGuard);
