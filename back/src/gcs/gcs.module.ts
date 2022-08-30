import { Module } from '@nestjs/common';
import { GcsService } from './gcs.service';

@Module({
  providers: [GcsService],
  exports: [GcsService],
})
export class GcsModule {}
