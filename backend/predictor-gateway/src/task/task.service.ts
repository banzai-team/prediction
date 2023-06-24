import { Injectable } from '@nestjs/common';
import { Task, TaskHistory, TaskType } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch, Repository } from 'typeorm';
import { TaskCreateDto } from './task.dto';
import { TaskTypeService } from './task-type.service';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { TaskNotFoundException } from './task.exception';
import { plainToClass } from 'class-transformer';
import { PredictorService } from 'src/predictor/predictor.service';

@Injectable()
export class TaskService {
    constructor(
        @InjectRepository(TaskType) private readonly taskTypeRepository: Repository<TaskType>,
        @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
        private readonly taskTypeService: TaskTypeService,
        private readonly buildingObjectService: BuildingObjectService
    ) {}


    public async createTask (taskCreateDto: TaskCreateDto): Promise<TaskType> | never {
        const task = new Task();
        const taskType = await this.taskTypeService.getTaskTypeByCode(taskCreateDto.taskTypeCode);
        const buildingObject = await this.buildingObjectService.getBuildingObjectByKeyWithRelations(taskCreateDto.taskBuildingObjectKey);
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

    public async getTasksByObjectKey(objectKey: string): Promise<Task[]> {
        return await this.taskRepository.find({where: {objectKey}, relations: ['taskType']});
    }

    public async getTaskByObjectKeyTaskType (objectKey: string, taskTypeCode: string) {
        const task = await this.taskRepository.findOne({ where: { 
            buildingObject: {
                objKey: objectKey
            }, 
            taskType: {
                code: taskTypeCode
            }}});
        if (!task) throw new TaskNotFoundException("Task not found", -1);
        return task;
    }

    public async batchInsert(batch: TaskCreateDto[]) {
        this.taskRepository.createQueryBuilder()
            .insert()
            .into(Task)
            .values(batch)
            .execute();
    }

    public async batchUpsert(batch: TaskCreateDto[]) {
        const filteredBatch = [];
        console.log('Task batchUpsert', filteredBatch.length);
        const bos = await this.buildingObjectService.getBuildingObjects();
        const codes = await this.taskTypeService.getTaskTypes();
        try {
            this.taskRepository
            .createQueryBuilder()
            .insert()
            .into(Task)
            .values(batch.map(t => {
                const task = plainToClass(Task, t);
                task.buildingObject = bos.find(b => b.objKey === t.taskBuildingObjectKey);
                task.taskType = codes.find(b => b.code === t.taskTypeCode);
                return task;
            }))
            .orUpdate({ conflict_target: ['task_type_code', 'building_object_key'], overwrite: ['plan_start', 'plan_end'] })
            .execute();
            // console.log(batch);
            // await this.taskHistoryRepository.save(taskHistoies);
            // await this.taskRepository
            //     .query(`insert into task (building_object_key, task_type_code, plan_start, plan_end) 
            //     values ${filteredBatch.map(t => `('${t.taskBuildingObjectKey}', '${t.taskTypeCode}', '${t.plannedStart.toISOString()}', '${t.plannedEnd.toISOString()}')`)} 
            //     on conflict (building_object_key, task_type_code) DO UPDATE SET plan_start = EXCLUDED.plan_start, plan_end = EXCLUDED.plan_end;`)
        } catch(e) {
            console.error(e);
        }
        console.log('Task batchUpsert completed', batch.length);
    }
}
