import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigService } from '@nestjs/config';

import { EventsConsumer } from './events.consumer';
import { Config } from '../config/configuration';

export const EventsQueueName = 'queue';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService<Config>) => ({
        redis: configService.get('redis'),
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: EventsQueueName,
      defaultJobOptions: {
        removeOnComplete: 5,
        removeOnFail: 100,
      },
    }),
  ],
  providers: [
    EventsConsumer,
  ],
  exports: [],
})
export class EventsModule {
}
