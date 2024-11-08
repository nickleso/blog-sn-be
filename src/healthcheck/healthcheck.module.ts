import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class HealthCheckController {
  @Get('healthcheck')
  @ApiOperation({ summary: 'Check server health status' })
  @ApiResponse({ status: 200, description: 'The server is Ok' })
  healthCheck() {
    return { status: 200, description: 'The server is Ok' };
  }
}
