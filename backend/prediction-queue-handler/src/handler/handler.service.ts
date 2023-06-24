import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NotFoundError, firstValueFrom } from 'rxjs';
import { PredictorRequest, PredictorResponse, UpdateTaskDto } from './handler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './handler.entity';

const predictorConfig = (): {host: string, port: number} => ({
    host: process.env.PREDICTOR_HOST,
    port: Number(process.env.PREDICTOR_PORT)
  });

@Injectable()
export class HandlerService {
    constructor(private readonly httpService: HttpService,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>) {};
    
    public async doPredict(predictorRequest: PredictorRequest): Promise<void> {
        console.log(`Requesting predictor on: http://${predictorConfig().host}:${predictorConfig().port}/predict`);
        const json = {
            obj_prg: predictorRequest.obj_prg,
            obj_key: predictorRequest.obj_key,
            'Кодзадачи': predictorRequest.task_code,
            'ПроцентЗавершенияЗадачи': predictorRequest.progress,
            'ДатаНачалаЗадачи': predictorRequest.planStart,
            'ДатаОкончанияЗадачи': predictorRequest.planEnd,
            'ДатаначалаБП0': predictorRequest.actualStart ? predictorRequest.actualStart : predictorRequest.planStart
        }
        const resp = await firstValueFrom(this.httpService.post(`http://${predictorConfig().host}:${predictorConfig().port}/predict`, json));
        if(resp.status >= 200 && resp.status < 300) {  
            await this.updateTask({
                objectKey: predictorRequest.obj_key,
                taskCode: predictorRequest.task_code,
                daysOffset: resp.data['late_days']
            });
        } else {
            throw new InternalServerErrorException('Error when requesting prediction. Status code is not 200s')
        }
    }

    private async updateTask(upd: UpdateTaskDto) {
        const task = await this.taskRepository.findOne({
            where: {
                objectKey: upd.objectKey,
                taskTypeCode: upd.taskCode
            }
        });

        if (!task) {
            throw new NotFoundException(`Task with objKey: ${upd.objectKey} and taskTypeCode: ${upd.taskCode} was not found`);
        }
        task.offset = upd.daysOffset;
        await this.taskRepository.save(task);
    }
}
