import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('task')
export class Task {
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({name: 'plan_start', type: 'timestamp with time zone'})
    plannedStart: Date;

    @Column({name: 'plan_end', type: 'timestamp with time zone'})
    plannedEnd: Date;

    @Column({type: 'int4', name: 'offset_in_days'})
    offset: number;

    @Column({name: 'building_object_key'})
    objectKey: string;

    @Column({name: 'task_type_code'})
    taskTypeCode: string;
}
