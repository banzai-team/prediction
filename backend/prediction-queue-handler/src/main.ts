import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${config().rabbitmq.host}:${config().rabbitmq.port}`],
      queue: 'prediction',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
}

bootstrap();
