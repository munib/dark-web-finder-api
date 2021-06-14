import { Controller, Post, Body, Res, HttpStatus, Get, Param, Query } from '@nestjs/common';
import { ScheduleReportService } from './schedule-report.service';
import { ScheduleReportDto } from './schedule-report.dto';


@Controller('schedule-report')
export class ScheduleReportController {
    constructor(
        private scheduleReportService: ScheduleReportService) { }

    @Get('/test-email')
    async testEmail(@Res() res: any) {
        return res.status(HttpStatus.BAD_REQUEST).json({
            ok: true,
            message: 'working',
        });
    }

    @Get('/alert-email')
    async alertEmail(@Res() res: any) {
        try {
            const scheduleReport: any = await this.scheduleReportService.alertEmail();
            if (scheduleReport.ok) {
                return res.status(HttpStatus.OK).json({
                    ok: true,
                    scheduleReport: scheduleReport.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Get ScheduleReport',
                });
            }
        } catch (error) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                ok: false,
                message: 'Some error!',
                errors: error,
            });
        }
    }
}
