import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImporterProvider } from './importer/importer-provider';
import { CsvDocumentImporter } from './importer/csv-importer';
import { ExcelDocumentImporter } from './importer/excel-importer';

@Module({
  controllers: [ImportController],
  providers: [ImportService, ImporterProvider, CsvDocumentImporter, ExcelDocumentImporter]
})
export class ImportModule {}
