import { OnQueueCompleted, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('audio')
export class AudioProcessor {
  private readonly logger = new Logger(AudioProcessor.name);

  @Process('audio-job')
  handleTransCode(job: Job) {
    this.logger.log('Start audio compress into mp3...');
    this.logger.log(job.data);
  }

  @OnQueueCompleted()
  queueComplete() {
    this.logger.log('Audio completed!!');
  }
}
