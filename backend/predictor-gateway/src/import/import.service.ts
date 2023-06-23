import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';
import { BuildingObjectCreateDto } from 'src/building-object/buidling-object.dto';
import { BuildingObjectService } from 'src/building-object/building-object.service';

@Injectable()
export class ImportService {
    constructor(private readonly importerProvider: ImporterProvider,
        private readonly buildingObjectService: BuildingObjectService
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
        const create = [];
        
        for await (const bo of batch) {
            if (bo['obj_key']) {
                console.log('asd');
                const buildingObjectCreateDto = new BuildingObjectCreateDto();
                buildingObjectCreateDto.objKey = bo['obj_key'];
                if (!await this.buildingObjectService.existsBuildingObjectByKey( bo['obj_key'])) {
                    create.push(buildingObjectCreateDto);
                }
            }
            else {
                console.warn('Row has no obj_key value. Ignoring');
            }
        }
        console.log('asd');
        await this.buildingObjectService.batchInsert(create);
        console.log('Completed handleBuildingObjectBatch');
    }

    public importCriticalTaskFromDocuments(files: Array<Express.Multer.File>) {
        
    }
}
