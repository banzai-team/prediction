import { Controller, Get, Param } from '@nestjs/common';
import { TaskViewDto } from 'src/task/task.dto';
import { BuidlingObjectTaskService } from './buidling-object-task.service';

@Controller('building-object')
export class BuidlingObjectTaskController {
    constructor(private readonly buidlingObjectTaskService: BuidlingObjectTaskService) {}

    @Get(':key/tasks')
    async getBuildingObjectTasks(@Param('key') key: string): Promise<TaskViewDto[]> {
        return (await this.buidlingObjectTaskService.getTasksByObjectKey(key)).map(t => ({
            id: t.id,
            taskType: {
                isCritical: t.taskType.isCritical,
                code: t.taskType.code,
                name: t.taskType.name
            },
            plannedEnd: t.plannedEnd,
            plannedStart: t.plannedStart,
            offset: t.offset
        }));
    }
}
