import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';
import { PredictorRequest } from './handler.dto';
import { HandlerService } from './handler.service';

@Controller('handler')
export class HandlerController {

    constructor(private readonly handlerService: HandlerService) {}

    @MessagePattern({cmd: 'make-prediction'})
    async getNotifications(@Payload() data: PredictorRequest) {
        console.log(`Data: ${data}`);
        await this.handlerService.doPredict(data);
        return `Hello ${data}`;
    }
}
