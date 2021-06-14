import * as AWS from 'aws-sdk';
import { KeywordSearchDto } from './keyword-search.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class KeywordSearchRepository {
    constructor() { }

    async create(keywordSearchDto: KeywordSearchDto) {
        const newKeywordSearch = {
            id: uuid(),
            title: keywordSearchDto.title,
            status: keywordSearchDto.status,
        };
        try {
            await new AWS.DynamoDB.DocumentClient()
                .put({
                    TableName: process.env.TABLE_NAME_DB ?? process.env.SEARCH_KEYWORDS_TABLE_NAME,
                    Item: newKeywordSearch,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newKeywordSearch };
    }

    async findAll() {
        let keywordsearch;
        try {
            const result = await new AWS.DynamoDB.DocumentClient()
                .scan({
                    TableName: process.env.TABLE_NAME_DB ?? process.env.SEARCH_KEYWORDS_TABLE_NAME
                })
                .promise();

            keywordsearch = result.Items;
            //console.log("resultresultresultresult", result)
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!keywordsearch) {
            throw new NotFoundException(`Keyword search with status "${status}" not found`);
        }

        return { ok: true, data: keywordsearch };
    }

    async getById(id) {
        let keywordsearch;
        try {
            const result = await new AWS.DynamoDB.DocumentClient()
                .get({
                    TableName: process.env.TABLE_NAME_DB ?? process.env.SEARCH_KEYWORDS_TABLE_NAME,
                    Key: { id },
                })
                .promise();

            keywordsearch = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!keywordsearch) {
            throw new NotFoundException(`Keyword search with ID "${id}" not found`);
        }

        return { ok: true, data: keywordsearch };
    }
}
