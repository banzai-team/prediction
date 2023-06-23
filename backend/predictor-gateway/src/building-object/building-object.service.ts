import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingObject } from './buidling-object.entity';
import { Repository } from 'typeorm';
import { BuildingObjectNotFound } from './building-object.exception';
import { BuildingObjectCreateDto } from './buidling-object.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BuildingObjectService {
    constructor(@InjectRepository(BuildingObject) private readonly buildingObjectRepository: Repository<BuildingObject>) {}

    async createBuildingObject(createDto: BuildingObjectCreateDto) {
        const buildingObject = plainToClass(BuildingObject, createDto);
        await this.buildingObjectRepository.save(buildingObject);
        return buildingObject;
    }

    async getBuildingObjectByKey (objKey:string) {
        const buildingObject = await this.buildingObjectRepository.findOneBy({ objKey });
        if (!buildingObject) throw new BuildingObjectNotFound('Object not found', objKey);
        return buildingObject;
    }
}
