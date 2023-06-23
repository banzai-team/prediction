import { Module } from '@nestjs/common';
import { BuildingObject } from './buidling-object.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([BuildingObject])],
})
export class BuildingObjectModule {}
