import { OnQueueWaiting, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('video')
export class VideoProcessor {
  private readonly logger = new Logger(VideoProcessor.name);

  @Process('video-job')
  handleTransCode(job: Job) {
    this.logger.log('Start video compress into mp4...');
    this.logger.log(job.data);
    this.logger.log('completed!!');
  }

  @OnQueueWaiting({ name: 'video-job' })
  queueWaiting() {
    this.logger.verbose('Waiting video-job');
  }
}
