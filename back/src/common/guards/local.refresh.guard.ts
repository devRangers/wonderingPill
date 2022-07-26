import { Injectable, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthRefreshToken extends AuthGuard('jwt-refresh') {
  constructor() {
    super();
  }
}

export const LocalRefresh = () => UseGuards(LocalAuthRefreshToken);
