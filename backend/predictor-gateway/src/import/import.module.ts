import { Module } from '@nestjs/common';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImporterProvider } from './importer/importer-provider';
import { CsvDocumentImporter } from './importer/csv-importer';
import { ExcelDocumentImporter } from './importer/excel-importer';
import { BuildingObjectModule } from 'src/building-object/building-object.module';
import { TaskModule } from 'src/task/task.module';
import { PredictorModule } from 'src/predictor/predictor.module';

@Module({
  imports: [BuildingObjectModule, TaskModule, PredictorModule],
  controllers: [ImportController],
  providers: [ImportService, ImporterProvider, CsvDocumentImporter, ExcelDocumentImporter]
})
export class ImportModule {}
