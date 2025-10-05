import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { SearchEnhancedService } from './search-enhanced.service';
import { SearchEnhancedController } from './search-enhanced.controller';
import { SearchSimpleService } from './search-simple.service';
import { SearchSimpleController } from './search-simple.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    SearchController,
    SearchEnhancedController,
    SearchSimpleController,
  ],
  providers: [SearchService, SearchEnhancedService, SearchSimpleService],
  exports: [SearchService, SearchEnhancedService, SearchSimpleService],
})
export class SearchModule {}
