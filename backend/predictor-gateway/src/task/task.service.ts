import { Injectable } from '@nestjs/common';
import { Task, TaskHistory, TaskType } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch, Repository } from 'typeorm';
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

    public async batchInsert(batch: TaskCreateDto[]) {
        this.taskRepository.createQueryBuilder()
            .insert()
            .into(Task)
            .values(batch)
            .execute();
    }

    public async batchUpsert(batch: TaskCreateDto[]) {
        //console.log('tmsp', b.plannedStart.getTime());
        // console.log('Task batchUpsert', batch.length);
        // try {
        //     await this.taskRepository
        //     .query('select upsert_tasks($1, $2, $3, $4)', 
        //     [batch.map(b => b.taskBuildingObjectKey), 
        //         batch.map(b => b.taskTypeCode), 
        //         batch.map(b => b.plannedStart.toISOString()), 
        //         batch.map(b => b.plannedEnd.toISOString())
        // ]);
        // } catch(e) {
        //     console.error(e);
        // }
        const usedKeys = new Set();
        const filteredBatch = [];
        for (let i = 0; i < batch.length; i++) {
            const obj = batch[i];
            const key = obj.taskBuildingObjectKey + '-' + obj.taskTypeCode;
            if (!usedKeys.has(key)) {
                usedKeys.add(key);
                filteredBatch.push(obj);
            }
        }
        console.log('Task batchUpsert', filteredBatch.length);
        try {
            await this.taskRepository
                .query(`insert into task (building_object_key, task_type_code, plan_start, plan_end) 
                values ${filteredBatch.map(t => `('${t.taskBuildingObjectKey}', '${t.taskTypeCode}', '${t.plannedStart.toISOString()}', '${t.plannedEnd.toISOString()}')`)} 
                on conflict (building_object_key, task_type_code) DO UPDATE SET plan_start = EXCLUDED.plan_start, plan_end = EXCLUDED.plan_end;`)
        } catch(e) {
            console.error(e);
        }
        console.log('Task batchUpsert completed', batch.length);
        
    }
}
