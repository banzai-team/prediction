import { Injectable } from "@nestjs/common";
import { BatchDocumentImporter, DocumentImporter } from "../document-importer.interface";
import * as mime from 'mime-types';
import * as csv from 'csv-parser';
import * as fs from 'fs';
import * as Papa from 'papaparse';
import * as csvBatch from 'csv-batch';

@Injectable()
export class CsvDocumentImporter implements BatchDocumentImporter {
    private batchSize = 50;
    private batch = [];

    setBatchSize(size: number) {
        this.batchSize = size;
    }

    async doParse(document: Express.Multer.File, onBatchParsed: (batch: any[]) => Promise<void>): Promise<void> {
        console.log('Prasing .csv');
        let index = 0;
        await new Promise((res, rej) => {
            csvBatch(fs.createReadStream(`./uploads/${document.originalname}`), {
                batch: true,
                batchSize: 10000,
                batchExecution: async (batch) => {
                    console.log('Read 10000');
                    await onBatchParsed(batch);
                    console.log('Saved 10000');
                    //console.log('a', batch);
                }
            }).then(results => {
                console.log(`Processed ${results.totalRecords}`)
                res(true);
              });
        });
        
        // await new Promise(async (res, rej) => {
        //     Papa.parse(fs.createReadStream(`./uploads/${document.originalname}`), {
        //         worker: true,
        //         header: true,
        //         step: async (result) => {
        //             index ++;
        //             this.batch.push(result.data);
        //             console.log('batch', this.batch.length);
        //             if (this.batch.length >= this.batchSize && onBatchParsed) {
        //                 console.log(`Processing from ${index}`);
        //                 const cpy = [...this.batch];
        //                 this.batch = [];
        //                 
        //             }
        //         },
        //         complete: async () => {
        //             if (this.batch.length > 0 && onBatchParsed) {
        //                 await onBatchParsed(this.batch);
        //             }
        //             res(true);
        //         }
        //     });
        // });
        // await new Promise(async (res, rej) => {
        //     fs.createReadStream(`./uploads/${document.originalname}`)
        //     .pipe(csv())
        //     .on('data', async (data) => {
        //         this.batch.push(data);
        //         index ++;
        //         console.log(this.batch.length);
        //         if (this.batch.length >= this.batchSize && onBatchParsed) {
        //             console.log(`Processing from ${index}`);
        //             await onBatchParsed(this.batch);
        //             console.log('asd');
        //         }
                
        //     })
        //     .on('end', async () => {
        //         console.log('end')
        //         if (this.batch.length > 0 && onBatchParsed) {
        //             await onBatchParsed(this.batch);
        //         }
        //         res(true);
        //     });
        // });
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.csv');
    }

}