import { Module } from '@nestjs/common';
import { Task, TaskHistory, TaskType } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskTypeService } from './task-type.service';
import { BuildingObjectModule } from 'src/building-object/building-object.module';
import { TaskHistoryService } from './task-history.service';

@Module({
    imports: [TypeOrmModule.forFeature([Task, TaskType, TaskHistory]), BuildingObjectModule],
    providers: [TaskService, TaskTypeService, TaskHistoryService],
    controllers: [TaskController],
    exports: [TaskService, TaskTypeService, TaskHistoryService]
})
export class TaskModule {}
