import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { EmailConfig } from './config/email.config';
import { config } from './config/config';
import { KeywordSearchModule } from './keyword-search/keyword-search.module';
import { ScheduleReportModule } from './schedule-report/schedule-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useClass: EmailConfig,
    }),
    KeywordSearchModule,
    ScheduleReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
