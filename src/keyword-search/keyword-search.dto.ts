import { IsNotEmpty } from 'class-validator';

export class KeywordSearchDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    status: boolean;
}
