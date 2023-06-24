import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

import { EventsConsumer } from './events.consumer';
import { config } from '../config/configuration';

export const EventsQueueName = 'events-queue';

@Module({
  imports: [
    BullModule.forRoot({
      redis: config().redis
    }),
    BullModule.registerQueue({
      name: EventsQueueName,
    }),
  ],
  providers: [
    EventsConsumer,
  ],
  exports: [],
})
export class EventsModule {
}
