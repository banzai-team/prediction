import { Injectable } from "@nestjs/common";
import { CsvDocumentImporter } from "./csv-importer";
import { ExcelDocumentImporter } from "./excel-importer";
import { DocumentImporter } from "../document-importer.interface";

@Injectable()
export class ImporterProvider {
    private importers: DocumentImporter[];
    constructor(private readonly csvImporter: CsvDocumentImporter, 
            private readonly excelImporter: ExcelDocumentImporter) {
                this.importers = [];
                this.importers.push(csvImporter, excelImporter);
            }

    dispatch(file: Express.Multer.File) {
        this.importers.find(i => i.supports(file)).doParse(file);
    }
}