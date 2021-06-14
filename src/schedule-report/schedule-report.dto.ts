import { IsNotEmpty } from 'class-validator';

export class ScheduleReportDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    count: number;
}
