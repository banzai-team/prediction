import { Injectable } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskHistory } from "./task.entity";
import { TaskHistoryCreateDto } from "./task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { plainToClass } from "class-transformer";

@Injectable()
export class TaskHistoryService {
    constructor(@InjectRepository(TaskHistory) private readonly taskHistoryRepository: Repository<TaskHistory>, 
        private readonly taskService: TaskService) {
    }

    public async createTaskHistory(taskHistoryCreateDto: TaskHistoryCreateDto): Promise<TaskHistory> {
        //const task = await this.taskService.getTaskById(taskHistoryCreateDto.taskId);
        const taskHistory = new TaskHistory();
        //taskHistorykkk
        taskHistory.documentStart = taskHistoryCreateDto.documentStart;
        taskHistory.documentEnd = taskHistoryCreateDto.documentEnd;
        await this.taskHistoryRepository.save(taskHistory);
        return taskHistory;
    }

    /**
     * 
     * @param taskId numeric id of the task
     */
    public async getTaskHistoryByTaskId(taskId: number): Promise< TaskHistory[]> {
        const task = await this.taskService.getTaskById(taskId);
        const results = await this.taskHistoryRepository.find({
            where: {
                objectKey: task.objectKey,
                taskTypeCode: task.taskTypeCode
            }
        });
        return results;
    }

    public async patchTaskHistory() {

    }

    async batchInsert(batch: TaskHistoryCreateDto[]) {
        console.log('Inserting batch history: ', batch.length);
        try {
            await this.taskHistoryRepository.createQueryBuilder()
                .insert()
                .into(TaskHistory)
                .values(batch.map(h => {
                    const taskHistory = plainToClass(TaskHistory, h);
                    taskHistory.progress = Math.floor(taskHistory.progress);
                    return taskHistory;
                }))
                .orIgnore()
                .execute();
        } catch(e) {
            console.error(e);
        }
        
        console.log('Insert batch history complete', batch.length);
    }
}