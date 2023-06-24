import { Injectable } from '@nestjs/common';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { Task } from 'src/task/task.entity';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class BuidlingObjectTaskService {
    constructor(private readonly buildingObjectService: BuildingObjectService,
        private readonly taskService: TaskService) {}

    public async getTasksByObjectKey(key: string): Promise<Task[]> {
        return await this.taskService.getTasksByObjectKey(key);
    }
}
