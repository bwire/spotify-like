import { Injectable } from '@nestjs/common';

@Injectable()
export class DevConfigService {
  private dbHost: string = 'http://localhost';

  getDBHost(): string {
    return this.dbHost;
  }
}
