import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RedisContext } from '@nestjs/microservices';

@Controller('handler')
export class HandlerController {
    @MessagePattern({cmd: 'make-prediction'})
    getNotifications(@Payload() data: any) {
        console.log(`Data: ${data}`);
        return `Hello ${data}`;
    }
}
