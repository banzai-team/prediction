import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';

@Injectable()
export class ImportService {
    constructor(private readonly importerProvider: ImporterProvider) {}

    public importFromDocument() {
        
    }

    public importBuildingObjectFromDocuments(files: Array<Express.Multer.File>) {
        files.forEach(f => this.importerProvider.batchParse(f, this.handleBuildingObjectBatch));
    }

    private handleBuildingObjectBatch(batch: Array<any>) {
        
    }

    public importCriticalTaskFromDocuments(files: Array<Express.Multer.File>) {
        
    }
}
