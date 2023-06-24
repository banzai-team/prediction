import { InjectQueue, OnQueueActive, Process, Processor } from '@nestjs/bull';
import type { Job, Queue } from 'bull';
import { EventsQueueName } from "./events.module";
import { AbstractEventsConsumer } from "./AbstractEventsConsumer";
import { Logger } from "@nestjs/common";

@Processor(EventsQueueName)
export class EventsConsumer  {
  // constructor(
  //   @InjectQueue(EventsQueueName) private queue: Queue,
  // ) {
  //   // super();
  // }

  protected logger: Logger = new Logger('EventsQueueName');

  @Process("event")
  public async processEvent(
    job: Job<{ collections: { id: string; metadata: string }[] }>
  ) {

  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }
}
