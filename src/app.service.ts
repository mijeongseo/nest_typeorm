import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(version: number): any {
    return {
      DB_USERNAME: this.configService.get('DB_USERNAME'),
      version: version,
    };
  }
}
