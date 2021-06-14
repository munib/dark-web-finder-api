import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ScheduleReportRepository } from './schedule-report.repository';
import { KeywordSearchRepository } from '../keyword-search/keyword-search.repository';

@Injectable()
export class ScheduleReportService {
    constructor(
        private scheduleReportRepository: ScheduleReportRepository,
        private keywordSearchRepository: KeywordSearchRepository,
        private readonly mailerService: MailerService,
    ) { }

    async alertEmail() {
        const domains = (await this.keywordSearchRepository.findAll()).data.map(item => item.title).reduce((a, b) => {
            if (a.indexOf(b) < 0) a.push(b);
            return a;
        }, []);
        let result = [];
        for (let domain of domains) {
            const response = await this.scheduleReportRepository.findInDarkWeb(domain);
            result.push({ title: domain, total: response.data.total })
        }
        console.log("result", result);



        await this.sendEmail(result);
        return { ok: true, msg: "email send!" }
    }

    async sendEmail(result: any) {

        let rows = ``;
        result.forEach(item => {
            rows += `<tr><td class="row">${item.title} </td><td class="row">${item.total} </td><tr>`
        })
        const html = this.getTemplate(rows);
        const config = {
            to: process.env.toEmail,
            from: process.env.fromEmail,
            subject: "Darkweb- domain list alter email!",
            body: html
        }
        const email = this.scheduleReportRepository.sendEmail(config);
        /* console.log(html)
            this.mailerService
              .sendMail({
                to: "munib18@gmail.com",
                subject: "Domain find in dark web",
                html: html
              })
              .catch(err => {
                console.log('=========', err);
              }); */
    }

    getTemplate(rows: string) {
        return `<!DOCTYPE html>

        <head>
            <meta charset="utf-8">
            <meta http-equiv="x-ua-compatible" content="ie=edge">
            <title>Dark web:- Alter Email</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style type="text/css">
                /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
                @media screen {
                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 400;
                        src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
                    }

                    @font-face {
                        font-family: 'Source Sans Pro';
                        font-style: normal;
                        font-weight: 700;
                        src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
                    }
                }

                /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
                body,
                table,
                td,
                a {
                    -ms-text-size-adjust: 100%;
                    /* 1 */
                    -webkit-text-size-adjust: 100%;
                    /* 2 */
                }

                /**
           * Remove extra space added to tables and cells in Outlook.
           */
                table,
                td {
                    mso-table-rspace: 0pt;
                    mso-table-lspace: 0pt;
                }

                /**
           * Better fluid images in Internet Explorer.
           */
                img {
                    -ms-interpolation-mode: bicubic;
                }

                /**
           * Remove blue links for iOS devices.
           */
                a[x-apple-data-detectors] {
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    color: inherit !important;
                    text-decoration: none !important;
                }

                /**
           * Fix centering issues in Android 4.4.
           */
                div[style*="margin: 16px 0;"] {
                    margin: 0 !important;
                }

                body {
                    width: 100% !important;
                    height: 100% !important;
                    padding: 0 !important;
                    margin: 0 !important;
                }

                /**
           * Collapse table borders to avoid space between cells.
           */
                table {
                    border-collapse: collapse !important;
                }

                a {
                    color: black;
                }

                img {
                    height: auto;
                    line-height: 100%;
                    text-decoration: none;
                    border: 0;
                    outline: none;
                }
            </style>

        </head>

        <body>

            <!-- start body -->
            <table border="0" cellpadding="0" cellspacing="0" width="100%">



                <!-- start copy block -->
                <tr>
                    <td align="center" bgcolor="#e9ecef">
                        <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <!-- start copy -->
                            <tr>
                                <td bgcolor="#ffffff" align="left"
                                    style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                                    <h1 style="margin: 0 0 12px; font-size: 32px; font-weight: 400; line-height: 48px;">Hi Munib here!</h1>
                                    <p style="margin: 0;">Domain occurrence list count:</p>
                                </td>
                            </tr>
                            <!-- end copy -->

                            <!-- start button -->
                            <tr>
                                <td align="left" bgcolor="#ffffff" style="padding: 5px;">
                                    <table border="1" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <th align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                Domain
                                            </th>
                                            <th align="center" bgcolor="#ffffff" style="padding: 12px;">
                                                Total (Count)
                                            </th>
                                        </tr>
                                            ${rows}
                                    </table>
                                </td>
                            </tr>
                            <!-- end button -->

                            <!-- start copy -->
                            <tr>
                                <td align="left" bgcolor="#ffffff"
                                    style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                                    <p style="margin: 0;">Report By,<br> seedata.io</p>
                                </td>
                            </tr>
                            <!-- end copy -->

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
                    </td>
                </tr>
                <!-- end copy block -->

                <!-- start footer -->
                <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                        <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">

                            <!-- start permission -->
                            <tr>
                                <td align="center" bgcolor="#e9ecef"
                                    style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                                    <p style="margin: 0;">You received this email because of darweb cron.</p>
                                </td>
                            </tr>
                            <!-- end permission -->

                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
                    </td>
                </tr>
                <!-- end footer -->

            </table>
            <!-- end body -->

        </body>

        </html>`;
    }
}
