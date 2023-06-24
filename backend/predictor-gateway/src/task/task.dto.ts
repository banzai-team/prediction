import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TaskTypeCreateDto {

    @IsNotEmpty()
    @IsString()
    code: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    isCritical: boolean;
}

export class TaskHistoryCreateDto {
    @IsNotEmpty()
    @IsInt()
    taskId: number;

    @IsString()
    @IsOptional()
    objectKey: string;

    @IsString()
    @IsOptional()
    taskTypeCode: string;

    @IsOptional()
    progress: number;

    @IsOptional()
    @IsDateString()
    documentStart: Date;

    @IsOptional()
    @IsDateString()
    documentEnd: Date;
}

export class TaskCreateDto {

    @IsNotEmpty()
    @IsString()
    taskBuildingObjectKey: string;

    @IsNotEmpty()
    @IsString()
    taskTypeCode: string;

    @IsDateString()
    plannedStart: Date;

    @IsDateString()
    plannedEnd: Date;

    @IsOptional()
    taskHistory: TaskHistoryCreateDto[];
}

export interface TaskTypeViewDto {
    code: string;
    name: string;
    isCritical: boolean;
}

export interface TaskViewDto {
    taskType: TaskTypeViewDto;
    plannedStart: Date;
    plannedEnd: Date;
}