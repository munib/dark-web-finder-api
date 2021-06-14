import { Controller, Post, Body, Res, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { KeywordSearchService } from './keyword-search.service';
import { KeywordSearchDto } from './keyword-search.dto';

@Controller('keyword-search')
export class KeywordSearchController {
    constructor(private keywordsearchService: KeywordSearchService) {}

    @Post()
    async create(@Body() keywordSearchDto: KeywordSearchDto, @Res() res: any) {
        try {

            const newKeywordSearch: any = await this.keywordsearchService.createKeywordSearch(keywordSearchDto);
            if (newKeywordSearch.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    data: newKeywordSearch.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Create KeywordSearch',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }

    @Get()
    async findAll(@Res() res: any) {
        try {
            const keywordsearch: any = await this.keywordsearchService.findAll();
            if (keywordsearch.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    keywordsearch: keywordsearch.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get KeywordSearch',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Internal server error.',
                errors: error,
            });
        }
    }

    @Get('/:id')
    async getKeywordSearchById(@Param('id') id: string, @Res() res: any) {
        try {
            const keywordsearch: any = await this.keywordsearchService.getKeywordSearchById(id);
            if (keywordsearch.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    keywordsearch: keywordsearch.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get KeywordSearch',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Error Trying to reach DB',
                errors: error,
            });
        }
    }
}
