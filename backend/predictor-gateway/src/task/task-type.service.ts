import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TaskType } from "./task.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskTypeCreateDto } from "./task.dto";
import { plainToClass } from "class-transformer";
import { TaskTypeNotFoundException } from "./task.exception";

@Injectable()
export class TaskTypeService {
    constructor(@InjectRepository(TaskType) private readonly taskTypeRepository: Repository<TaskType>) {}

    public async createTaskType(taskTypeCreateDto: TaskTypeCreateDto): Promise<TaskType> {
        const taskType = plainToClass(TaskType, taskTypeCreateDto);
        await this.taskTypeRepository.save(taskType);
        return taskType;
    }

    public async getTaskTypeByCode(code: string): Promise<TaskType> | never {
        const taskType = await this.taskTypeRepository.findOneBy({ code });
        if (!taskType) throw new TaskTypeNotFoundException('Task type was not found' , code);
        return taskType;
    }

    public async getUniqueTaskTypeCodes(): Promise<{code: string}[]> {
        return await this.taskTypeRepository.createQueryBuilder()
        .select(['code'])
        .execute();
    }

    public async batchInsert(taskTypeCreateDtos: TaskTypeCreateDto[]) {
        await this.taskTypeRepository.createQueryBuilder()
            .insert()
            .into(TaskType)
            .values(taskTypeCreateDtos.map(d => plainToClass(TaskType, d)))
            .execute();
    }
}