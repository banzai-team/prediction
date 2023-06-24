import { TaskCreateDto, TaskViewDto } from "src/task/task.dto";

export class BuildingObjectCreateDto {
    objKey: string;
}

export interface BuildingObjectViewDto {
    objKey: string;
    tasks: TaskViewDto[];
}