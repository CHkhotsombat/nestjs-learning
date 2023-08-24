import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { Queue } from 'bull';

@Injectable()
export class HelloJobService {
  constructor(@InjectQueue('hello') private readonly helloQueue: Queue) {}
  private readonly logger = new Logger(HelloJobService.name);

  @Cron('15 * * * * *', { disabled: false })
  handleCron() {
    this.logger.warn('Hello handleCron : At second 15.');
  }

  @Cron('*/5 * * * * *', { disabled: true })
  async handleHelloCron() {
    this.logger.warn('Hello handleHelloCron : every 5 sec.');
    await this.helloQueue.add('hello-job', { data: 'Hello world' });
  }
}
