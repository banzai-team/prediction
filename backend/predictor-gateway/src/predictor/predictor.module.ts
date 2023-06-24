import { Module } from '@nestjs/common';
import { PredictorService } from './predictor.service';
import { HttpModule } from '@nestjs/axios';
import { PredictorController } from './predictor.controller';

@Module({
    imports: [HttpModule],
    providers: [PredictorService],
    exports: [PredictorService],
    controllers: [PredictorController]
})
export class PredictorModule {}
