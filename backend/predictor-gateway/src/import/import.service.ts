import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';
import { BuildingObjectCreateDto } from 'src/building-object/buidling-object.dto';
import { BuildingObjectService } from 'src/building-object/building-object.service';
import { TaskTypeService } from 'src/task/task-type.service';
import { TaskCreateDto, TaskHistoryCreateDto, TaskTypeCreateDto } from 'src/task/task.dto';
import * as moment from 'moment';
import { TaskService } from 'src/task/task.service';

const keys = {
    objKey: 'obj_key',
    taskCode: 'Кодзадачи',
    taskName: 'НазваниеЗадачи',
    plannedStart: 'ДатаНачалаЗадачи',
    plannedEnd: 'ДатаОкончанияЗадачи',
    documentStart: 'ДатаначалаБП0',
    documentEnd: 'ДатаокончанияБП0',
    progress: 'ПроцентЗавершенияЗадачи'
};

@Injectable()
export class ImportService {
    

    constructor(private readonly importerProvider: ImporterProvider,
        private readonly buildingObjectService: BuildingObjectService,
        private readonly taskTypeService: TaskTypeService,
        private readonly taskService: TaskService,
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
        const createBuildingObjects = [];
        const createTaskTypes = [];
        const createTasks = [];
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

                    const taskCreateDto = new TaskCreateDto();
                    taskCreateDto.taskTypeCode = row[keys.taskCode];
                    taskCreateDto.taskBuildingObjectKey = row[keys.objKey];
                    taskCreateDto.plannedStart = this.parseDate(row[keys.plannedStart]);
                    taskCreateDto.plannedEnd = this.parseDate(row[keys.plannedEnd]);
                    //console.log('taskCreateDto', taskCreateDto);
                    createTasks.push(taskCreateDto);

                    const taskHistoryCreateDto = new TaskHistoryCreateDto();
                    taskHistoryCreateDto.objectKey = row[keys.objKey];
                    taskHistoryCreateDto.taskTypeCode = row[keys.taskCode];
                    if (row[keys.plannedStart]) {
                        taskHistoryCreateDto.documentStart = this.parseDate(row[keys.plannedStart]);
                    }
                    if (row[keys.plannedEnd]) {
                        taskHistoryCreateDto.documentEnd = this.parseDate(row[keys.plannedEnd]);
                    }
                    taskHistoryCreateDto.progress = row[keys.progress];
                    console.log(taskHistoryCreateDto);
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
        await this.taskService.batchUpsert(createTasks);
        console.log('Completed handleBuildingObjectBatch', batch.length);
    }

    private parseDate(value: string): Date {
        var parts = value.split("-");
        let dateFormat =  new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return moment(dateFormat).utcOffset(0, true).toDate();
    }

    public importCriticalTaskFromDocuments(files: Array<Express.Multer.File>) {
        
    }
}
