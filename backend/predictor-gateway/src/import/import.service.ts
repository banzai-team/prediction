import { Injectable } from '@nestjs/common';
import { ImporterProvider } from './importer/importer-provider';

@Injectable()
export class ImportService {
    constructor(private readonly importerProvider: ImporterProvider) {}

    public importFromDocument() {
        
    }

    public importFromDocuments(files: Array<Express.Multer.File>) {
        files.forEach(f => this.importerProvider.dispatch(f));
    }
}
