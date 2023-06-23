import { Injectable } from "@nestjs/common";
import { CsvDocumentImporter } from "./csv-importer";
import { ExcelDocumentImporter } from "./excel-importer";
import { BatchDocumentImporter, DocumentImporter } from "../document-importer.interface";

@Injectable()
export class ImporterProvider {
    private batchImporters: BatchDocumentImporter[];
    constructor(private readonly csvImporter: CsvDocumentImporter, 
            private readonly excelImporter: ExcelDocumentImporter) {
                this.batchImporters = [];
                this.batchImporters.push(csvImporter, excelImporter);
            }

    batchParse(file: Express.Multer.File,
        onBatchParsed: (batch: Array<any>) => void) {
        this.batchImporters
            .find(i => i.supports(file))
            .doParse(file, onBatchParsed);
    }
}