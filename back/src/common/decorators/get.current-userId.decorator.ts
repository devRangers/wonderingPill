import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): string => {
    console.log('????');
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    console.log(user);
    return user.sub;
  },
);
