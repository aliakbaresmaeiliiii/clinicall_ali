import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { NavItemsService } from './nav-items.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Nav Items')
@Controller('nav-items')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NavItemsController {
  constructor(private readonly navItemsService: NavItemsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all navigation items' })
  @ApiResponse({ status: 200, description: 'List of navigation items' })
  findAll() {
    return this.navItemsService.findAll();
  }
}
