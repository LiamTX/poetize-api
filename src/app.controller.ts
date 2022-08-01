import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthcheck(): string {
    return 'WORKING';
  }
}
