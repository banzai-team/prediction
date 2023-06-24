import { Module } from '@nestjs/common';
import { BuidlingObjectTaskService } from './buidling-object-task.service';
import { TaskModule } from 'src/task/task.module';
import { BuildingObjectModule } from 'src/building-object/building-object.module';
import { BuidlingObjectTaskController } from './buidling-object-task.controller';

@Module({
  providers: [BuidlingObjectTaskService],
  imports: [TaskModule, BuildingObjectModule],
  controllers: [BuidlingObjectTaskController]
})
export class BuidlingObjectTaskModule {}
