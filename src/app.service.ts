import { Injectable } from '@nestjs/common';
import { DevConfigService } from './common/providers/devConfig.service';

@Injectable()
export class AppService {
  constructor(private config: DevConfigService) {}

  getHello(): string {
    return `Hello from ${this.config.getDBHost()}!`;
  }
}
