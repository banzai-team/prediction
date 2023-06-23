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

    doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => void): void {
        console.log('Parsing excel');
        const data = XLSX.readFileSync(`./uploads/${document.originalname}`);
        data.SheetNames.forEach((sheetName) => {
            const rows = XLSX.utils.sheet_to_row_object_array(data.Sheets[sheetName]);
            let batch = [];
            rows.forEach(r => {
                batch.push(r);
                if (batch.length === this.batchSize) {
                    if (onBatchParsed) onBatchParsed(batch);
                    batch = [];
                }
            });
            if (batch.length > 0) onBatchParsed(batch);
          })
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.xlsx');
    }

}