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
        const uniqueKeys = new Set((await this.buildingObjectService.getUniqueObjectKeys()).map(r => r['obj_key']));
        for (const bo of batch) {
            if (bo['obj_key']) {
                const buildingObjectCreateDto = new BuildingObjectCreateDto();
                buildingObjectCreateDto.objKey = bo['obj_key'];
                if (!uniqueKeys.has( bo['obj_key'])) {
                    create.push(buildingObjectCreateDto);
                    uniqueKeys.add(bo['obj_key']);
                }
            }
            else {
                console.warn('Row has no obj_key value. Ignoring');
            }
        }
        await this.buildingObjectService.batchInsert(create);
        console.log('Completed handleBuildingObjectBatch', batch.length);
    }

    public importCriticalTaskFromDocuments(files: Array<Express.Multer.File>) {
        
    }
}
