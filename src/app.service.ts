import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    const serverName = this.configService.get<string>('MCP_SERVER_NAME');
    return `Hello from ${serverName}!`;
  }
}
