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

    async doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => Promise<void>): Promise<void> {
        console.log('Prasing .csv');
        let batch = [];
        await new Promise(async (res, rej) => {
            fs.createReadStream(`./uploads/${document.originalname}`)
            .pipe(csv({
                mapHeaders: ({ header, index }) => header
            }))
            .on('data', async (data) => {
                console.log('data', data);
                batch.push(data);
                if (batch.length === this.batchSize && onBatchParsed) {
                    await onBatchParsed(batch);
                    batch = [];
                }
            })
            .on('end', async () => {
                console.log('end', batch.length, onBatchParsed);
                if (batch.length > 0 && onBatchParsed) {
                    await onBatchParsed(batch);
                }
                res(true);
            });
        });
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.csv');
    }

}