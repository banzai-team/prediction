import { Injectable } from "@nestjs/common";
import { TaskService } from "./task.service";
import { TaskHistory } from "./task.entity";
import { TaskHistoryCreateDto } from "./task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class TaskhistoryService {
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
}