import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HandlerModule } from './handler/handler.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HandlerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'building_predictor',
      entities: ["dist/**/*.entity.js"],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
