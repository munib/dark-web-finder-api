import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }


  getDateTime(): string {
    return `current time is : ${new Date()}`
  }

}
