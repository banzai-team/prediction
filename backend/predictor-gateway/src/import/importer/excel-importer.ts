import { Injectable } from "@nestjs/common";
import { BatchDocumentImporter } from "../document-importer.interface";
import * as XLSX from 'js-xlsx'; 
import * as mime from 'mime-types';

@Injectable()
export class ExcelDocumentImporter implements BatchDocumentImporter {
    private batchSize = 50;

    setBatchSize(size: number) {
        this.batchSize = size;
    }

    async doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => Promise<void>): Promise<void> {
        console.log('Parsing excel');
        const data = XLSX.readFileSync(`./uploads/${document.originalname}`);
        await Promise.all(data.SheetNames.map( async (sheetName) => {
            const rows = XLSX.utils.sheet_to_row_object_array(data.Sheets[sheetName]);
            let batch = [];
            for await (const row of rows) {
                batch.push(row);
                if (batch.length === this.batchSize) {
                    if (onBatchParsed) await onBatchParsed(batch);
                    batch = [];
                }
            }
            if (batch.length > 0) await onBatchParsed(batch);
        }));
        console.log('Completed doParse');
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.xlsx');
    }

}