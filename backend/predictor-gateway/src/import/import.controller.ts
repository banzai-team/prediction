import { Controller, HttpStatus, InternalServerErrorException, ParseFilePipeBuilder, Post, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ImportService } from './import.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { UnparseableDocument } from './import.exception';

@Controller('import')
export class ImportController {

    constructor(private readonly importService: ImportService) {}

    @Post('building-object')
    @UseInterceptors(FilesInterceptor('files', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename(req, file, callback) {
                callback(null, file.originalname);
            },
          }),
    }))
    async uploadBuildingObjectFile(@UploadedFiles(
        new ParseFilePipeBuilder()
            .build({
                errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })) files: Array<Express.Multer.File>) {
            try {
                await this.importService.importBuildingObjectFromDocuments(files);
            } catch (e) {
                if (e instanceof UnparseableDocument) {
                    console.error(e.stack);
                    throw new InternalServerErrorException('Error parsing document');
                } else {
                    throw e;
                }
            }
    }

    @Post('critical-task')
    @UseInterceptors(FilesInterceptor('files', 20, {
        storage: diskStorage({
            destination: './uploads',
            filename(req, file, callback) {
                callback(null, file.originalname);
            },
          }),
    }))
    async uploadCritialTaskFile() {

    }
}
