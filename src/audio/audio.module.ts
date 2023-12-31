import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { QueuesModule } from 'src/queues/queues.module';

@Module({
  imports: [QueuesModule],
  controllers: [AudioController],
})
export class AudioModule {}
