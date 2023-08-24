import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
  @Process('audio-job')
  handleTransCode(job: Job) {
    console.log('Start audio compress into mp3...');
    console.log(job.data);
    console.log('completed!!');
  }
}

@Processor('video')
export class VideoConsumer {
  @Process('video-job')
  handleTransCode(job: Job) {
    console.log('Start vidoe compress into mp4...');
    console.log(job.data);
    console.log('completed!!');
  }
}
