import { Injectable } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskHistory } from "./task.entity";
import { TaskHistoryCreateDto } from "./task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TaskHistoryService {
    constructor(@InjectRepository(TaskHistory) private readonly taskHistoryRepository: Repository<TaskHistory>, 
        private readonly taskService: TaskService) {
    }

    public async createTaskHistory(taskHistoryCreateDto: TaskHistoryCreateDto): Promise<TaskHistory> {
        const task = await this.taskService.getTaskById(taskHistoryCreateDto.taskId);
        const taskHistory = new TaskHistory();
        taskHistory.task = task;
        taskHistory.documentStart = taskHistoryCreateDto.documentStart;
        taskHistory.documentEnd = taskHistoryCreateDto.documentEnd;
        await this.taskHistoryRepository.save(taskHistory);
        return taskHistory;
    }

    async patchTaskHistory() {

    }

    async batchInsert(batch: TaskHistoryCreateDto[]) {
        console.log('Inserting batch history: ', batch.length);
        try {
            await Promise.all(batch.map((h) => {
                return new Promise(async (res, rej) => {
                    if (!h.taskId) {
                        const task = await this.taskService.getTaskByObjectKeyTaskType(h.objectKey, h.taskTypeCode);
                        h.taskId = task.id;
                    }
                    console.log('ДОЛГО СУКА!');
                    res(true);
                }
            );
                
            }));
            // for await (const h of batch) {
            //     this.taskHistoryRepository.createQueryBuilder().select()
            //     if (!h.taskId) {
            //         console.log('a')
            //         const task = await this.taskService.getTaskByObjectKeyTaskType(h.objectKey, h.taskTypeCode);
            //         h.taskId = task.id;
            //     }
            // }
            await this.taskHistoryRepository.createQueryBuilder()
                .insert()
                .into(TaskHistory)
                .values(batch)
                .execute();
        } catch(e) {
            console.error(e);
        }
        
        console.log('Insert batch history complete', batch.length);
    }
}