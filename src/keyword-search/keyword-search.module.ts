import { Module } from '@nestjs/common';
import { KeywordSearchController } from './keyword-search.controller';
import { KeywordSearchService } from './keyword-search.service';
import { KeywordSearchRepository } from './keyword-search.repository';

@Module({
    imports: [],
    controllers: [KeywordSearchController],
    providers: [KeywordSearchService, KeywordSearchRepository],
    exports: [KeywordSearchService]
})
export class KeywordSearchModule {}
