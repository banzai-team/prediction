import { Module } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { HttpModule } from '@nestjs/axios';
import { PredictorController } from './predictor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from "../config/configuration";

@Module({
    imports: [
        HttpModule,
        ClientsModule.register([
            {
              name: 'PREDICTION_QUEUE',
              transport: Transport.RMQ,
              options: {
                urls: [{
                  protocol: "amqp",
                  hostname: config().rabbitmq.host,
                  port: config().rabbitmq.port,
                  username: config().rabbitmq.username,
                }],
                queue: 'prediction',
                queueOptions: {
                  durable: false
                },
              },
            },
          ]),
    ],
    providers: [PredictorService],
    exports: [PredictorService],
    controllers: [PredictorController]
})
export class PredictorModule {}
