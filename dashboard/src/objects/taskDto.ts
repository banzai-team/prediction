export interface TaskTypeViewDto {
    code: string;
    name: string;
    isCritical: boolean;
}

export interface TaskHistoryViewDto {
    id: number;
    reportDate: Date;
    actualStart: Date;
    actualEnd: Date;
    progress: number;
}

export interface TaskViewDto {
    id: number;
    taskType: TaskTypeViewDto;
    plannedStart: Date;
    plannedEnd: Date;
    offset: number;
}