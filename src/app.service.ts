import { Inject, Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfig.service';

@Injectable()
export class AppService {
  constructor(
    private config: DevConfigService,

    @Inject('PORT_CONFIG')
    private portConfig: { port: number },
  ) {}

  getHello(): string {
    return `Hello from ${this.config.getDBHost()}, port: ${this.portConfig.port}`;
  }
}
