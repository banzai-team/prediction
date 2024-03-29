import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';
import { BuildingObjectCreateDto } from 'src/building-object/buidling-object.dto';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { TaskTypeService } from 'src/task/task-type.service';
import { TaskCreateDto, TaskHistoryCreateDto, TaskTypeCreateDto } from 'src/task/task.dto';
import * as moment from 'moment';
import { TaskService } from 'src/task/task.service';
import { TaskHistoryService } from 'src/task/task-history.service';
import { PredictorService } from 'src/predictor/predictor.service';
import { ExcelDocumentImporter } from './importer/excel-importer';

const keys = {
    objKey: 'obj_key',
    taskCode: 'Кодзадачи',
    taskName: 'НазваниеЗадачи',
    plannedStart: 'ДатаНачалаЗадачи',
    plannedEnd: 'ДатаОкончанияЗадачи',
    documentStart: 'ДатаначалаБП0',
    documentEnd: 'ДатаокончанияБП0',
    progress: 'ПроцентЗавершенияЗадачи',
    reportDate: 'date_report'
};

@Injectable()
export class ImportService {
    

    constructor(private readonly importerProvider: ImporterProvider,
        private readonly buildingObjectService: BuildingObjectService,
        private readonly taskTypeService: TaskTypeService,
        private readonly taskService: TaskService,
        private readonly taskHisoryService: TaskHistoryService,
        private readonly predictorService: PredictorService
        ) {
        }

    public importFromDocument() {
        
    }

    public async importBuildingObjectFromDocuments(files: Array<Express.Multer.File>) {
        for await (const f of files) {
            await this.importerProvider.batch(f, async (batch) => {await this.handleBuildingObjectBatch(batch)});
        } 
        console.log('Completed importBuildingObjectFromDocuments');
    }

    public async importCriticalTaskFromDocuments(files: Array<Express.Multer.File>): Promise<void> {
        for await (const f of files) {
            await this.importerProvider.batch(f, async (batch) => {await this.handleCriticalTaskTypes(batch)});
        } 
        console.log('Completed importBuildingObjectFromDocuments');
    }

    private async handleBuildingObjectBatch(batch: Array<any>) : Promise<void> {
        try {
            const createBuildingObjects = [];
            const createTaskTypes = [];
            const historyMap = new Map<String, TaskHistoryCreateDto>(); 
            const taskMap = new Map<String, TaskCreateDto>();
            const uniqueObjectKeys = new Set((await this.buildingObjectService.getUniqueObjectKeys()).map(r => r['obj_key']));
            const uniqueTaskCodes = new Set((await this.taskTypeService.getUniqueTaskTypeCodes()).map(r => r['code']));
            for (const row of batch) {
                if (row[keys.objKey]) {
                    if (!uniqueObjectKeys.has( row[keys.objKey])) {
                        const buildingObjectCreateDto = new BuildingObjectCreateDto();
                        buildingObjectCreateDto.objKey = row[keys.objKey];
                        createBuildingObjects.push(buildingObjectCreateDto);
                        uniqueObjectKeys.add(row[keys.objKey]);
                    }
                    if (row[keys.taskCode]) {
                        if (!uniqueTaskCodes.has(row[keys.taskCode])) {
                            const taskTypeCreateDto = new TaskTypeCreateDto();
                            taskTypeCreateDto.code = row[keys.taskCode];
                            taskTypeCreateDto.name = row[keys.taskName];
                            createTaskTypes.push(taskTypeCreateDto);
                            uniqueTaskCodes.add(row[keys.taskCode]);
                            //const taskHistory = new TaskHistoryCreateDto();
                        }
                        let taskCreateDto = taskMap.get(row[keys.objKey] + '-' + row[keys.taskCode]);
                        if (taskCreateDto) {
                            taskCreateDto.plannedStart = this.parseDate(row[keys.plannedStart]);
                            taskCreateDto.plannedEnd = this.parseDate(row[keys.plannedEnd]);
                        } else {
                            taskCreateDto = new TaskCreateDto();
                            taskCreateDto.taskTypeCode = row[keys.taskCode];
                            taskCreateDto.taskBuildingObjectKey = row[keys.objKey];
                            taskCreateDto.plannedStart = this.parseDate(row[keys.plannedStart]);
                            taskCreateDto.plannedEnd = this.parseDate(row[keys.plannedEnd]);
                            taskMap.set(row[keys.objKey] + '-' + row[keys.taskCode], taskCreateDto);
                        }
    
                        if (row[keys.documentStart]) {
                            const historyCreateDto = historyMap.get(row[keys.objKey] + '-' + row[keys.taskCode] + '-' + 
                            row[keys.documentStart] + row[keys.documentEnd]);
                            if (!historyCreateDto) {
                                const historyCreateDto = new TaskHistoryCreateDto();
                                historyCreateDto.objectKey = row[keys.objKey];
                                historyCreateDto.taskTypeCode = row[keys.taskCode];
                                if (row[keys.reportDate]) {
                                    historyCreateDto.reportDate = this.parseDate(row[keys.reportDate]) ;
                                }
                                if (row[keys.documentStart]) {
                                    historyCreateDto.documentStart = this.parseDate(row[keys.documentStart]);
                                }
                                if (row[keys.documentEnd]) {
                                    historyCreateDto.documentEnd = this.parseDate(row[keys.documentEnd]);
                                }
                                historyCreateDto.progress = row[keys.progress];
                                historyMap.set(row[keys.objKey] + '-' + row[keys.taskCode] + '-' + row[keys.reportDate], historyCreateDto);
                            }
                        }
                    } else {
                        console.warn('Row has no Код задачи value. Ignoring');
                    }
                }
                else {
                    console.warn('Row has no obj_key value. Ignoring');
                }
            }
            await this.buildingObjectService.batchInsert(createBuildingObjects);
            await this.taskTypeService.batchInsert(createTaskTypes);
            await this.taskService.batchUpsert([...taskMap.values()]);
            await this.taskHisoryService.batchInsert([...historyMap.values()]);
            try {
                await this.submitRowToQueue(batch);
            } catch(e) {
                console.error(e);
            }
        } catch(e) {
            console.error(e);
        }
        
        console.log('Completed handleBuildingObjectBatch', batch.length);
    }

    private async handleCriticalTaskTypes(batch: Array<any>) {
        await Promise.all(batch.map(async (row) => {
            if (row['Кодзадачи']) {
                const taskType = await this.taskTypeService.fetchTaskTypeByCode(row['Кодзадачи']);
                if (taskType) {
                    taskType.name = row['НазваниеЗадачи'];
                    taskType.isCritical = true;
                    await this.taskTypeService.updateTaskType(taskType);
                } else {
                    const taskTypeCreate = new TaskTypeCreateDto();
                    taskTypeCreate.code = row['Кодзадачи'];
                    taskTypeCreate.name = row['НазваниеЗадачи'];
                    taskTypeCreate.isCritical = true;
                    await this.taskTypeService.createTaskType(taskTypeCreate);
                }
            }
        }));
    }

    parseDate(value: string): Date {
        if (!value) return;
        if (value.indexOf('/') >= 0) {
            return this.parseDateSlash(value);
        } else if (value.indexOf('.') >= 0) {
            return this.parseDateDot(value);
        } if (value.indexOf('-') >= 0) {
            return this.parseDateDash(value);
        }
    }

    parseDateSlash(value: string): Date {
        var parts = value.split("/");
        let dateFormat =  new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    parseDateDot(value: string): Date {
        var parts = value.split(".");
        let dateFormat =  new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    private parseDateDash(value: string): Date {
        var parts = value.split("-");
        let dateFormat =  new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    private async submitRowToQueue(rows: Array<any>) {
        // submit row to queue
        console.log('Submitting task for queue');
        await Promise.all(rows.map((row) => {
            return new Promise((res, rej) => {
                this.predictorService.submitTaskToQueue({
                    obj_key: row[keys.objKey],
                    obj_prg: row['obj_prg'],
                    task_code: row[keys.taskCode],
                    planStart: row['ДатаНачалаЗадачи'],
                    planEnd: row['ДатаОкончанияЗадачи'],
                    actualStart: row['ДатаначалаБП0'],
                    progress: row['ПроцентЗавершенияЗадачи']
                }).then(res)
                .catch(rej);
            });
        }))
        console.log('Submitting tasks for queue');
    }
}
