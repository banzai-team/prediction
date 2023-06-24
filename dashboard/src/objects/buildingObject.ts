import {TaskViewDto} from './taskDto';

export interface BuildingObjectViewDto {
    objKey: string;
    tasks: TaskViewDto[];
}