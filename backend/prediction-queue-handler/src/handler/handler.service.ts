import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NotFoundError, firstValueFrom } from 'rxjs';
import { PredictorRequest, PredictorResponse, UpdateTaskDto } from './handler.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './handler.entity';
import moment from 'moment';

const predictorConfig = (): {host: string, port: number} => ({
    host: process.env.PREDICTOR_HOST,
    port: Number(process.env.PREDICTOR_PORT)
  });

@Injectable()
export class HandlerService {
    constructor(private readonly httpService: HttpService,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>) {};
    
        // Дата через - год месяц день
    public async doPredict(predictorRequest: PredictorRequest): Promise<void> {
        console.log(`Requesting predictor on: http://${predictorConfig().host}:${predictorConfig().port}/predict`);
        if (predictorRequest.obj_key && predictorRequest.task_code) {
            const json = {
                obj_prg: predictorRequest.obj_prg,
                obj_key: predictorRequest.obj_key,
                task_id: predictorRequest.task_code,
                percent_ready: predictorRequest.progress,
                plan_start_date: this.parseDateToDashFormat(predictorRequest.planStart),
                plan_end_date: this.parseDateToDashFormat(predictorRequest.planEnd),
                real_start_date: this.parseDateToDashFormat(predictorRequest.actualStart ? predictorRequest.actualStart : predictorRequest.planStart)
            }
            const resp = await firstValueFrom(this.httpService.post(`http://${predictorConfig().host}:${predictorConfig().port}/predict`, json));
            if(resp.status >= 200 && resp.status < 300) {  
                console.log('Received response from predictor: ', {
                    objectKey: predictorRequest.obj_key,
                    taskCode: predictorRequest.task_code,
                    daysOffset: resp.data['late_days']
                })
                await this.updateTask({
                    objectKey: predictorRequest.obj_key,
                    taskCode: predictorRequest.task_code,
                    daysOffset: resp.data['late_days']
                });
            } else {
                throw new InternalServerErrorException('Error when requesting prediction. Status code is not 200s')
            }
        } else {
            console.warn(`Invalid row formatting. ${predictorRequest} will not be sent to queue`);
        }
        
    }

    parseDateToDashFormat(value: string): string {
        if (!value) {
            if (!value) return;
        }
        if (value.indexOf('/') >= 0) {
            return this.parseDateSlash(value);
        } else if (value.indexOf('.') >= 0) {
            return this.parseDateDot(value);
        } if (value.indexOf('-') >= 0) {
            return value;
        }
    }

    parseDateSlash(value: string): string {
        var parts = value.split("/");
        return parseInt(parts[2]) + '-' + parseInt(parts[0]) + '-' + parseInt(parts[1]);
    }

    parseDateDot(value: string): string {
        var parts = value.split(".");
        return parseInt(parts[0]) + '-' + parseInt(parts[1]) + '-' + parseInt(parts[2]);
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
