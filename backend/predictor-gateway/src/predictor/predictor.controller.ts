import { Body, Controller, Get, Post } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { PredictorRequest } from './prediction.dto';

@Controller('predictor')
export class PredictorController {
    constructor(private readonly predictorService: PredictorService) {}

    @Post()
    async doPredict(@Body() request: PredictorRequest) {
        return await this.predictorService.doPredict(request);
    }
}
