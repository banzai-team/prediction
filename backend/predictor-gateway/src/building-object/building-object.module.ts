import { Module } from '@nestjs/common';
import { BuildingObject } from './buidling-object.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingObjectService } from './building-object.service';

@Module({
    imports: [TypeOrmModule.forFeature([BuildingObject])],
    providers: [BuildingObjectService],
    exports: [BuildingObjectService]
})
export class BuildingObjectModule {}
