import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';
import { BuildingObjectCreateDto } from 'src/building-object/buidling-object.dto';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { TaskTypeService } from 'src/task/task-type.service';
import { TaskCreateDto, TaskHistoryCreateDto, TaskTypeCreateDto } from 'src/task/task.dto';
import * as moment from 'moment';
import { TaskService } from 'src/task/task.service';
import { TaskHistoryService } from 'src/task/task-history.service';

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
        private readonly taskHisoryService: TaskHistoryService
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
    
                        if (row[keys.reportDate]) {
                            const reportDate = this.parseDateDot(row[keys.reportDate]);
                            const historyCreteDto = historyMap.get(row[keys.objKey] + '-' + row[keys.taskCode] + '-' + row[keys.reportDate]);
                            if (!historyCreteDto) {
                                const historyCreateDto = new TaskHistoryCreateDto();
                                historyCreateDto.objectKey = row[keys.objKey];
                                historyCreateDto.taskTypeCode = row[keys.taskCode];
                                historyCreateDto.reportDate = reportDate;
                                if (row[keys.plannedStart]) {
                                    historyCreateDto.documentStart = this.parseDate(row[keys.plannedStart]);
                                }
                                if (row[keys.plannedEnd]) {
                                    historyCreateDto.documentEnd = this.parseDate(row[keys.plannedEnd]);
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
        } catch(e) {
            console.error(e);
        }
        
        console.log('Completed handleBuildingObjectBatch', batch.length);
    }

    private parseDate(value: string): Date {
        var parts = value.split("-");
        let dateFormat =  new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    private parseDateDot(value:string): Date {
        var parts = value.split(".");
        let dateFormat =  new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    public importCriticalTaskFromDocuments(files: Array<Express.Multer.File>) {
        
    }
}
