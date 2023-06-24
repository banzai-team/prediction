import { Module } from '@nestjs/common';
import { HandlerController } from './handler.controller';
import { HandlerService } from './handler.service';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './handler.entity';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Task])
  ],
  controllers: [HandlerController],
  providers: [HandlerService]
})
export class HandlerModule {}
