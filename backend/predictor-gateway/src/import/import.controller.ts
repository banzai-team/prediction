import { Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ImportService } from './import.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileValidationPipe } from './file-validation.pipe';
import * as fs from 'fs';
import { diskStorage } from 'multer';

@Controller('import')
export class ImportController {

    constructor(private readonly importService: ImportService) {}

    @Post('')
    @UseInterceptors(FilesInterceptor('files', 20, {
        storage: diskStorage({
            destination: './uploads/',
            filename(req, file, callback) {
                console.log(file.originalname);
                callback(null, file.originalname);
            },
          }),
    }))
    async uploadFile(@UploadedFiles(
        new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })) files: Array<Express.Multer.File>) {
            this.importService.importFromDocuments(files);
    }
}
