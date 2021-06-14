import { HttpService, Injectable } from '@nestjs/common';
const AWS = require('aws-sdk');
const SES = new AWS.SES({region: 'us-east-1'});


@Injectable()
export class ScheduleReportRepository {
    constructor(
        private httpService: HttpService,
    ) { }

    async findInDarkWeb(query: string): Promise<any> {

        const result = await this.httpService.get(`https://darksearch.io/api/search?query=${query}`)
            .toPromise()
            .then(res => res.data)
            .catch(err => { console.log(err) })
        return { ok: true, data: result };
    }

    async sendEmail(config: any) {
        const { to, from, subject, body } = config;
        const params = {
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Body: {
                    Html: { Data: body }
                },
                Subject: {
                    Data: subject
                },
            },
            Source: from
        };

        try {
            await SES.sendEmail(params).promise();
            return {
                statusCode: 200,
                body: 'Email sent!'
            }
        } catch (e) {
            console.error(e);
            return {
                statusCode: 400,
                body: 'Sending failed'
            }
        }
    }
}
