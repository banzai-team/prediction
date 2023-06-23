import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportModule } from './import/import.module';
import { BuildingObjectModule } from './building-object/building-object.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { config } from './config/configuration';
import { DataSourceOptions } from "typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from "./auth/auth.module";
import { HealthModule } from "./health/health.module";


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      // validationSchema: envSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get<DataSourceOptions>('db'),
      inject: [ConfigService],
    }),
    AuthModule,
    ImportModule,
    BuildingObjectModule,
    TaskModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
