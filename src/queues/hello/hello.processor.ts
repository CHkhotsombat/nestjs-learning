import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('hello')
export class HelloProcessor {
  @Process('hello-job')
  handleTransCode(job: Job) {
    console.log('Hello queue consumer ...');
    console.log(job.data);
    console.log('completed!!');
  }
}
