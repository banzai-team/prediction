import { Task } from "src/task/task.entity";
import { Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity()
export class BuildingObject {
    @PrimaryColumn({name: 'obj_key', type: 'varchar'})
    objKey: string;

    @OneToMany(type => Task, task => task.buildingObject)
    tasks: Task[];
}