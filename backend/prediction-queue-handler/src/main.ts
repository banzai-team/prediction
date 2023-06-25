import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { config } from "./config/configuration";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      // urls: [`amqp://${config().rabbitmq.host}:${config().rabbitmq.port}`],
      urls: [{
        protocol: "amqp",
        hostname: config().rabbitmq.host,
        port: config().rabbitmq.port,
        username: config().rabbitmq.username,
        password: config().rabbitmq.password,
      }],
      queue: 'prediction',
      queueOptions: {
        durable: false
      },
    },
  });
  await app.listen();
}

bootstrap();
