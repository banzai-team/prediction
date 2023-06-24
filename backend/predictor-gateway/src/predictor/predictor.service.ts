import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { PredictorRequest, PredictorResponse } from './prediction.dto';
import { map, firstValueFrom} from 'rxjs';
import { config } from 'src/config/configuration';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PredictorService {
    constructor(@Inject('PREDICTION_QUEUE') private client: ClientProxy) {}

    public async submitTaskToQueue(predictorRequest: PredictorRequest) {
        return await firstValueFrom(this.client.send({cmd: 'make-prediction'}, predictorRequest));
    }
}
