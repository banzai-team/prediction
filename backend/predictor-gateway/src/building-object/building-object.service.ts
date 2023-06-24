import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BuildingObject } from './buidling-object.entity';
import { DataSource, Repository } from 'typeorm';
import { BuildingObjectNotFound } from './building-object.exception';
import { BuildingObjectCreateDto } from './buidling-object.dto';
import { plainToClass } from 'class-transformer';
import { Page, Pageable, PageableAndSortable } from 'src/common/common.interface';

@Injectable()
export class BuildingObjectService {
    constructor(@InjectRepository(BuildingObject) private readonly buildingObjectRepository: Repository<BuildingObject>,
    private dataSource: DataSource) {}

    async createBuildingObject(createDto: BuildingObjectCreateDto) {
        const buildingObject = plainToClass(BuildingObject, createDto);
        await this.buildingObjectRepository.save(buildingObject);
        return buildingObject;
    }

    async getBuildingObjectByKeyWithRelations (objKey:string) {
        const buildingObject = await this.buildingObjectRepository.findOne({ where: { objKey },
            relations: ['tasks', 'tasks.taskType']});
        if (!buildingObject) throw new BuildingObjectNotFound('Object not found', objKey);
        console.log(buildingObject.tasks);
        return buildingObject;
    }

    async getBuildingObjectsPageWithRelations(pageable: PageableAndSortable): Promise<Page<BuildingObject>>  {
        const [result, total] = await this.buildingObjectRepository.findAndCount({
            take: pageable.size,
            skip: pageable.offset,
            order: {
                objKey: pageable.desc ? 'DESC' : 'ASC'
            },
            relations: ['tasks', 'tasks.taskType']});
        console.log(result);
        return {
            content: result,
            offset: pageable.offset,
            size: result.length,
            total
        };        
    }

    async getBuildingObjects(): Promise<BuildingObject[]> {
        return await this.buildingObjectRepository.find();
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

    async batchUpsert(createDtos: BuildingObjectCreateDto[]) {
        await this.dataSource.createQueryBuilder()
            .insert()
            .into(BuildingObject)
            .values(createDtos.map(d => plainToClass(BuildingObject, d)))
            .orIgnore(true)
            .execute();
    }

    async getUniqueObjectKeys(): Promise<Array<{obj_key: string}>> {
        return await this.buildingObjectRepository.createQueryBuilder()
            .select(['obj_key'])
            .execute();
    }
}
