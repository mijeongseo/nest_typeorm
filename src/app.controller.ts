import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello(1);
  }
  @Version('2')
  @Get()
  getHello2(): any {
    return this.appService.getHello(2);
  }
}
