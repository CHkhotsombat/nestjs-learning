import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { AudioModule } from './audio/audio.module';
import { HelloModule } from './hello/hello.module';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'audio' },
      { name: 'video' },
      { name: 'hello' },
    ),
    AudioModule,
    HelloModule,
    VideoModule,
  ],
  exports: [BullModule],
})
export class QueuesModule {}
