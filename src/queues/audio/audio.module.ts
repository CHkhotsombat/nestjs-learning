import { Module } from '@nestjs/common';
import { AudioProcessor } from './audio.processor';

@Module({
  providers: [AudioProcessor],
  exports: [AudioProcessor],
})
export class AudioModule {}
