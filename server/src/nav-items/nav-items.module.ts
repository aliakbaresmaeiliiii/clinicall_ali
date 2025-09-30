import { Module } from '@nestjs/common';
import { NavItemsController } from './nav-items.controller';
import { NavItemsService } from './nav-items.service';

@Module({
  controllers: [NavItemsController],
  providers: [NavItemsService],
  exports: [NavItemsService],
})
export class NavItemsModule {}
