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
      port: 3306,
      username: 'postgres',
      password: 'postgres',
      database: 'building_predictor',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
