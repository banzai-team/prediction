import { Injectable } from '@nestjs/common';
import { Task, TaskHistory, TaskType } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskCreateDto } from './task.dto';
import { TaskTypeService } from './task-type.service';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { TaskNotFoundException } from './task.exception';
import { plainToClass } from 'class-transformer';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskType) private readonly taskTypeRepository: Repository<TaskType>,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        @InjectRepository(TaskHistory) private readonly taskHistoryRepository: Repository<TaskHistory>,
        private readonly taskTypeService: TaskTypeService,
        private readonly buildingObjectService: BuildingObjectService
    ) {}


    public async createTask (taskCreateDto: TaskCreateDto): Promise<TaskType> | never {
        const task = new Task();
        const taskType = await this.taskTypeService.getTaskTypeByCode(taskCreateDto.taskTypeCode);
        const buildingObject = await this.buildingObjectService.getBuildingObjectByKey(taskCreateDto.taskBuildingObjectKey);
        task.taskType = taskType;
        task.buildingObject = buildingObject;
        task.plannedStart = taskCreateDto.plannedStart;
        task.plannedEnd = taskCreateDto.plannedEnd;
        await this.taskTypeRepository.save(taskType);
        return taskType;
    }

    public async getTaskById(id: number) : Promise<Task> | never {
        const task = await this.taskRepository.findOneBy({ id });
        if (!task) throw new TaskNotFoundException("Task not found", id);
        return task;
    }

    public async batchInsert(batch: TaskCreateDto[]) {
        this.taskRepository.createQueryBuilder()
            .insert()
            .into(Task)
            .values(batch)
            .execute();
    }
}
