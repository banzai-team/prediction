import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { PredictorRequest } from './handler.dto';
import { HandlerService } from './handler.service';

@Controller('handler')
export class HandlerController {

    constructor(private readonly handlerService: HandlerService) {}

    @MessagePattern({cmd: 'make-prediction'})
    async getNotifications(@Payload() row: PredictorRequest) {
        console.log('Received: ', row);
        await this.handlerService.doPredict(row);
        //await Promise.all(rows.map(async(row) =>  ));
        console.log('Completed prediction processing');
        return `Completed`;
    }
}
