import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('healthcheck')
  healthCheck() {
    return { status: 'Ok' };
  }
}
