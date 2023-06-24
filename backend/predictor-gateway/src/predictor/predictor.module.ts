import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { config } from 'src/config/configuration';
const predictorConfig = config().predictor;
@Module({
    imports: [
        ClientsModule.register([
            { 
                name: 'PREDICTOR_SERVICE', 
                transport: Transport.TCP,
                options: { host: predictorConfig.host, port: predictorConfig.port } },
          ]),
    ]
})
export class PredictorModule {}
