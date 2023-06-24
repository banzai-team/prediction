import { Module } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { HttpModule } from '@nestjs/axios';
import { PredictorController } from './predictor.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        HttpModule,
        ClientsModule.register([
            {
              name: 'PREDICTION_QUEUE',
              transport: Transport.RMQ,
              options: {
                urls: ['amqp://localhost:15672'],
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
