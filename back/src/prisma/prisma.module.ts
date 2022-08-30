import { Global, Module } from '@nestjs/common';
import { PrismaMongoService } from './prisma-mongo.service';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService, PrismaMongoService],
  exports: [PrismaService, PrismaMongoService],
})
export class PrismaModule {}
