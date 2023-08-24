import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { HelloJobModule } from './hello-job/hello-job.module';

@Module({
  imports: [ScheduleModule.forRoot(), HelloJobModule],
})
export class JobsModule {}
