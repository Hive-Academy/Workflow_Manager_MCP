import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
    // console.log('Prisma client connected.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    // console.log('Prisma client disconnected.');
  }
}
