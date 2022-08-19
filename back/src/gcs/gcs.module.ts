import { Global, Module } from '@nestjs/common';
import { GcsService } from './gcs.service';

@Global()
@Module({
  providers: [GcsService],
  exports: [GcsService],
})
export class GcsModule {}
