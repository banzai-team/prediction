import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { PredictorRequest } from './prediction.dto';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom} from 'rxjs';

@Controller('predictor')
export class PredictorController {
    constructor(private readonly predictorService: PredictorService,
        @Inject('PREDICTION_QUEUE') private client: ClientProxy) {}

    @Post('redis')
    async doPredict2() {
        return await firstValueFrom(this.client.send({cmd: 'make-prediction'}, {obj_key: 'bob'}));
    }
}
