import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string, ttl: number): Promise<boolean> {
    const result: string = await this.cacheManager.set(key, value, { ttl });
    if (result !== 'OK') {
      throw new ForbiddenException('Failed Caching');
    }
    return true;
  }

  async getKey(key: string): Promise<string> {
    const value: string = (await this.cacheManager.get(key)) as string;
    if (!value) {
      throw new ForbiddenException('토큰이 존재하지 않습니다.');
    }
    return value;
  }

  async delKey(key: string): Promise<boolean> {
    const result: number = await this.cacheManager.del(key);
    if (result !== 1) {
      throw new ForbiddenException('Failed Caching');
    }
    return true;
  }
}
