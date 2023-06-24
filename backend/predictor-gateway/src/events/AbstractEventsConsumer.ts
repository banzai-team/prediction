import {
  OnGlobalQueueError,
  OnQueueActive,
  OnQueueError,
  OnQueueFailed,
} from '@nestjs/bull';
import { Job } from 'bull';
import { Logger } from '@nestjs/common';

export abstract class AbstractEventsConsumer {
  protected abstract logger: Logger;

  @OnQueueError()
  OnQueueError(err: Error) {
    this.logger.error(err);
  }

  @OnQueueFailed()
  OnQueueFailed(job: Job, err: Error) {
    this.logger.error(`${job.id} of type ${job.name} failed`, err);
  }

  @OnGlobalQueueError()
  OnGlobalQueueError(err: Error) {
    this.logger.error(err);
  }

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.log(`Processing job ${job.id} of type ${job.name}`);
  }
}
