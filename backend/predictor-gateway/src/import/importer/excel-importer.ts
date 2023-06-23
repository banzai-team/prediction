import { Injectable } from "@nestjs/common";
import { DocumentImporter } from "../document-importer.interface";
import * as XLSX from 'js-xlsx'; 
import * as mime from 'mime-types';

@Injectable()
export class ExcelDocumentImporter implements DocumentImporter {

    doParse(document: Express.Multer.File): void {
        console.log('Parsing excel');
        //const read = XLSX.readFileSync(`./uploads/${files[0].originalname}`);
        //throw new Error("Method not implemented.");
    }
    supports(document: Express.Multer.File): boolean {
        return document.mimetype === mime.lookup('.xlsx');
    }

}