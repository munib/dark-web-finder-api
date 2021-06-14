import { Injectable } from '@nestjs/common';
import { KeywordSearchDto } from './keyword-search.dto';
import { KeywordSearchRepository } from './keyword-search.repository';

@Injectable()
export class KeywordSearchService {
    constructor(private keywordsearchRepository: KeywordSearchRepository) {}

    async createKeywordSearch(keywordSearchDto: KeywordSearchDto) {

        const createdOffer = await this.keywordsearchRepository.create(keywordSearchDto);

        return createdOffer;
    }

    async findAll() {
        const KeywordSearch = await this.keywordsearchRepository.findAll();
        return KeywordSearch;
    }

    async getKeywordSearchById(id) {
        const KeywordSearch = await this.keywordsearchRepository.getById(id);
        return KeywordSearch;
    }
}
