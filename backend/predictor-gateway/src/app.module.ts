import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImportModule } from './import/import.module';
import { BuildingObjectModule } from './building-object/building-object.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, ImportModule, BuildingObjectModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'building_predictor',
      entities: ['dist/**/*.entity{.ts,.js}']
    }),
    TaskModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
