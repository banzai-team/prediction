import { Controller, Get, Param, ParseIntPipe, Query, UsePipes } from '@nestjs/common';
import { BuildingObjectService } from './building-object.service';
import { BuildingObjectViewDto } from './buidling-object.dto';
import { Page, Pageable, PageableAndSortable } from 'src/common/common.interface';
import { BuildingObject } from './buidling-object.entity';
import { PageableValidationPipe } from 'src/common/common.pipe';

@Controller('building-object')
export class BuildingObjectController {
    constructor(private readonly buildingObjectService: BuildingObjectService) {}

    @Get(':key')
    async getBuildingObjectById (@Param('key') key: string): Promise<BuildingObjectViewDto> {
        const bo = await this.buildingObjectService.getBuildingObjectByKeyWithRelations(key);
        return this.mapToDtoWithRelations(bo);
    }

    @Get('')
    @UsePipes(PageableValidationPipe)
    async getBuildingObjectPage(@Query() pageable: PageableAndSortable): Promise<Page<BuildingObjectViewDto>> {
        if (pageable.offset === undefined) pageable.offset = 0;
        if (pageable.size === undefined) pageable.size = 10;
        const page = await this.buildingObjectService.getBuildingObjectsPageWithRelations(pageable);
        const dtoPage = {...page, content: page.content.map(r => this.mapToDtoWithRelations(r))};
        return dtoPage;
    }


    private mapToDtoWithRelations(bo: BuildingObject): BuildingObjectViewDto {
        return {
            objKey: bo.objKey,
            tasks: bo.tasks ? bo.tasks.map(t => {
                const taskType = t.taskType;
                return {
                    offset: t.offset,
                    id: t.id,
                    taskType: { code: taskType.code, name: taskType.name, isCritical: taskType.isCritical},
                    plannedStart: t.plannedStart,
                    plannedEnd: t.plannedEnd
                }
            }) : []
        };
    }

}
