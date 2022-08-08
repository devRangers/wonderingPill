import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();

    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?response=${
          body.token
        }&secret=${this.configService.get('RECAPTCHA_V2_SECRETKEY')}`,
      )
      .toPromise();

    if (!data.success) {
      throw new ForbiddenException('비정상적인 트래픽 활동이 감지되었습니다.');
    }

    return true;
  }
}
