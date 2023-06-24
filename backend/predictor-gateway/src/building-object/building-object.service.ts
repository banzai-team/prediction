import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingObject } from './buidling-object.entity';
import { DataSource, Repository } from 'typeorm';
import { BuildingObjectNotFound } from './building-object.exception';
import { BuildingObjectCreateDto } from './buidling-object.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class BuildingObjectService {
    constructor(@InjectRepository(BuildingObject) private readonly buildingObjectRepository: Repository<BuildingObject>,
    private dataSource: DataSource) {}

    async createBuildingObject(createDto: BuildingObjectCreateDto) {
        const buildingObject = plainToClass(BuildingObject, createDto);
        await this.buildingObjectRepository.save(buildingObject);
        console.log('saved bo');
        return buildingObject;
    }

    async getBuildingObjectByKey (objKey:string) {
        const buildingObject = await this.buildingObjectRepository.findOneBy({ objKey });
        if (!buildingObject) throw new BuildingObjectNotFound('Object not found', objKey);
        return buildingObject;
    }

    async existsBuildingObjectByKey(objKey:string): Promise<boolean> {
        return await this.buildingObjectRepository.exist({ where: { objKey } });
    }

    async batchInsert(createDtos: BuildingObjectCreateDto[]) {
        console.log('batchInsert start', createDtos.length);
        await this.dataSource.createQueryBuilder()
            .insert()
            .into(BuildingObject)
            .values(createDtos.map(d => plainToClass(BuildingObject, d)))
            .execute();
        console.log('batchInsert complete', createDtos.length);
    }

    async getUniqueObjectKeys(): Promise<Array<{obj_key: string}>> {
        return await this.buildingObjectRepository.createQueryBuilder()
            .select(['obj_key'])
            .execute();
    }
}
