import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/auth/types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRT | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!data) return request.user;
    return request.user[data];
  },
);
