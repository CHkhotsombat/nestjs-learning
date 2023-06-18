import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return { service: 'This is NestJs Learning APIs services.' };
  }
}
