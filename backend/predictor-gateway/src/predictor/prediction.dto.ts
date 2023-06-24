export interface PredictorRequest {
    obj_prg: string;
    obj_key: string;
    task_code: string;
    progress: number;
    planStart: string;
    planEnd: string;
    actualStart?: string;
}

export interface PredictorResponse {
    daysOffset: number;
}

// obj_prg: string
// obj_key: string
// Кодзадачи: 
// ПроцентЗавершенияЗадачи
// ДатаНачалаЗадачи
// ДатаОкончанияЗадачи
// ДатаначалаБП0 Если пустая, то ДатаНачалаЗадачи
// 