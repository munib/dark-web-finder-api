import { HttpModule, Module } from '@nestjs/common';
import { ScheduleReportController } from './schedule-report.controller';
import { ScheduleReportService } from './schedule-report.service';
import { ScheduleReportRepository } from './schedule-report.repository';
import { KeywordSearchRepository } from '../keyword-search/keyword-search.repository';

@Module({
    imports: [
        HttpModule
    ],
    controllers: [ScheduleReportController],
    providers: [ScheduleReportService, ScheduleReportRepository, KeywordSearchRepository],

})
export class ScheduleReportModule {}
