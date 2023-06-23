import { Module } from '@nestjs/common';
import { Task, TaskHistory, TaskType } from './task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Task, TaskType, TaskHistory])],
})
export class TaskModule {}
