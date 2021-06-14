import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import * as path from 'path';
import { MailerOptionsFactory } from '@nestjs-modules/mailer';

@Injectable()
export class EmailConfig implements MailerOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMailerOptions() {
      console.log("path.join(__dirname, '..', '/templates')", path.join(__dirname, '..', '/templates'))
    return {
      transport: {
        host: this.configService.get('MAIL_HOST'),
        auth: {
          user: this.configService.get('MAIL_USER'),
          pass: this.configService.get('MAIL_PASS'),
        },
      },
      defaults: {
        from: `"No Reply" <${this.configService.get('MAIL_USER')}>`,
      },
      template: {
        dir: path.join(__dirname, '..', '/templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}