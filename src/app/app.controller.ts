import { Controller, Get } from '@nestjs/common';

@Controller('/healthcheck')
export class AppController {

  @Get()
  public async index() {
    return { status: 'ok' };
  }
}
