import { Injectable } from "@nestjs/common";
import { DocumentImporter } from "../document-importer.interface";
import * as mime from 'mime-types';

@Injectable()
export class CsvDocumentImporter implements DocumentImporter {

    doParse(document: Express.Multer.File): void {
        console.log('Prasing .csv');
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.csv');
    }

}