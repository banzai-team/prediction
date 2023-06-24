import { Module } from '@nestjs/common';
import { BuildingObject } from './buidling-object.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BuildingObjectService } from './building-object.service';
import { BuildingObjectController } from './building-object.controller';

@Module({
    imports: [TypeOrmModule.forFeature([BuildingObject])],
    providers: [BuildingObjectService],
    exports: [BuildingObjectService],
    controllers: [BuildingObjectController]
})
export class BuildingObjectModule {}
