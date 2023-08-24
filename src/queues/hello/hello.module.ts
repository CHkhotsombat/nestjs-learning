import { Module } from '@nestjs/common';
import { HelloProcessor } from './hello.processor';

@Module({
  providers: [HelloProcessor],
  exports: [HelloProcessor],
})
export class HelloModule {}
