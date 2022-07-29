import { JwtPayload } from '.';

export type JwtPayloadWithRT = JwtPayload & { refreshToken: string };
