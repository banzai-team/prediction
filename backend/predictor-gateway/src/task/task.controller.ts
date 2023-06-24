import { Controller, Get, NotFoundException, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { TaskNotFoundException } from './task.exception';
import { NotFoundError } from 'rxjs';
import { TaskHistoryService } from './task-history.service';
import { TaskHistoryViewDto } from './task.dto';

@Controller('task')
export class TaskController {

    constructor(private readonly taskHistoryService: TaskHistoryService) {}

    @Patch(':id')
    patchTask() {

    }

    @Get(':id/history')
    async getTaskHistory(@Param('id', ParseIntPipe) id: number): Promise<TaskHistoryViewDto[]> {
        try {
            const history = await this.taskHistoryService.getTaskHistoryByTaskId(id);
            return history.map(h => ({
                id: h.id,
                reportDate: h.reportDate,
                actualStart: h.documentStart,
                actualEnd: h.documentEnd,
                progress: h.progress
            }));
        } catch (e) {
            if (e instanceof TaskNotFoundException) {
                throw new NotFoundException(`Task with id ${e.id} was not found`)
            }
            throw e;
        }
    }

}
