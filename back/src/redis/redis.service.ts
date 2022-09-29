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
    try {
      await this.cacheManager.set(key, value, { ttl });
      return true;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async getKey(key: string): Promise<string> {
    try {
      const value: string = (await this.cacheManager.get(key)) as string;
      if (!value) {
        throw new ForbiddenException('토큰이 존재하지 않습니다.');
      }
      return value;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }

  async delKey(key: string): Promise<boolean> {
    try {
      const result: number = await this.cacheManager.del(key);
      if (result !== 1) {
        throw new ForbiddenException('Failed Caching');
      }
      return true;
    } catch (error) {
      throw new ForbiddenException('Failed Caching');
    }
  }
}
