import { Injectable } from "@nestjs/common";
import { BatchDocumentImporter, DocumentImporter } from "../document-importer.interface";
import * as mime from 'mime-types';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as csvBatch from 'csv-batch';

@Injectable()
export class CsvDocumentImporter implements BatchDocumentImporter {
    private batchSize = 10000;
    private batch = [];

    setBatchSize(size: number) {
        this.batchSize = size;
    }

    async doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => Promise<void>): Promise<void> {
        console.log('Prasing .csv');
        await new Promise((res, rej) => {
            csvBatch(fs.createReadStream(`./uploads/${document.originalname}`), {
                batch: true,
                batchSize: this.batchSize,
                batchExecution: async (batch) => {
                    await onBatchParsed(batch);
                }
            }).then(results => {
                console.log(`Processed ${results.totalRecords}`)
                res(true);
              });
        });
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.csv');
    }

}