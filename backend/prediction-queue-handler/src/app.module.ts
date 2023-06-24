import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlerModule } from './handler/handler.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from "./config/configuration";
import { DataSourceOptions } from "typeorm";

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
    HandlerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
