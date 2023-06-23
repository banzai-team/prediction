import { Injectable } from "@nestjs/common";
import { BatchDocumentImporter, DocumentImporter } from "../document-importer.interface";
import * as mime from 'mime-types';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class CsvDocumentImporter implements BatchDocumentImporter {
    private batchSize = 50;

    setBatchSize(size: number) {
        this.batchSize = size;
    }
    

    async doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => void): Promise<void> {
        console.log('Prasing .csv');
        let batch = [];
        fs.createReadStream(`./uploads/${document.originalname}`)
            .pipe(csv())
            .on('data', (data) => {
                console.log(onBatchParsed);
                batch.push(data);
                if (batch.length === this.batchSize && onBatchParsed) {
                    onBatchParsed(batch);
                    batch = [];
                }
            })
            .on('end', () => {
                if (batch.length > 0 && onBatchParsed) onBatchParsed(batch);
            });
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.csv');
    }

}