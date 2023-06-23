import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { FileValidationPipe } from './file-validation.pipe';
import { ImporterProvider } from './importer/importer-provider';
import { CsvDocumentImporter } from './importer/csv-importer';
import { ExcelDocumentImporter } from './importer/excel-importer';

@Module({
  controllers: [ImportController],
  providers: [ImportService, FileValidationPipe, ImporterProvider, CsvDocumentImporter, ExcelDocumentImporter]
})
export class ImportModule {}
