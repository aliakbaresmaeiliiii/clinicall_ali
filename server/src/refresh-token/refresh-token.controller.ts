import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { RefreshTokenService } from './refresh-token.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Refresh Token')
@Controller('refresh-token')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class RefreshTokenController {
  constructor(private readonly refreshTokenService: RefreshTokenService) {}

  @Get()
  @ApiOperation({ summary: 'Get all refresh tokens' })
  @ApiResponse({ status: 200, description: 'List of refresh tokens' })
  findAll() {
    return this.refreshTokenService.findAll();
  }
}
