import { Module } from '@nestjs/common';
import { HelloJobService } from './hello-job.service';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [QueuesModule],
  providers: [HelloJobService],
})
export class HelloJobModule {}
