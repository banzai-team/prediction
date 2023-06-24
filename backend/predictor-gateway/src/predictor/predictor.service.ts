import { HttpService } from '@nestjs/axios';
import { BadRequestException, Inject, Injectable, InternalServerErrorException, OnApplicationBootstrap } from '@nestjs/common';
import { PredictorRequest, PredictorResponse } from './prediction.dto';
import { map, firstValueFrom} from 'rxjs';
import { config } from 'src/config/configuration';

@Injectable()
export class PredictorService {
    constructor(private readonly httpService: HttpService) {}

    public async doPredict(predictorRequest: PredictorRequest): Promise<PredictorResponse> {
        console.log(`Requesting predictor on: http://${config().predictor.host}:${config().predictor.port}/predict`);
        const json = {
            obj_prg: predictorRequest.obj_prg,
            obj_key: predictorRequest.obj_key,
            'Кодзадачи': predictorRequest.task_code,
            'ПроцентЗавершенияЗадачи': predictorRequest.progress,
            'ДатаНачалаЗадачи': predictorRequest.planStart,
            'ДатаОкончанияЗадачи': predictorRequest.planEnd,
            'ДатаначалаБП0': predictorRequest.actualStart ? predictorRequest.actualStart : predictorRequest.planStart
        }
        const resp = await firstValueFrom(this.httpService.post(`http://${config().predictor.host}:${config().predictor.port}/predict`, json));
        if(resp.status >= 200 && resp.status < 300) {
            return {
                daysOffset: resp.data['late_days']
            }
        } else {
            throw new InternalServerErrorException('Error when requesting prediction. Status code is not 200s')
        }
        //this.client.send()
    }
}
