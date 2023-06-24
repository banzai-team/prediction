import { BuildingObject } from "src/building-object/buidling-object.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('task_type')
export class TaskType {

    @PrimaryColumn({type: 'varchar'})
    code: string;

    @Column()
    name: string;

    @Column({type: 'boolean', name: 'is_critical'})
    isCritical: boolean;

    @OneToMany(type => Task, task => task.taskType)
    tasks: Task[];

    @OneToMany(type => TaskHistory, taskHistory => taskHistory.taskType)
    taskHistories: TaskHistory[];
}

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

    @ManyToOne(type => BuildingObject, buildingObject => buildingObject.tasks)
    @JoinColumn({name: 'building_object_key'})
    buildingObject: BuildingObject;

    @ManyToOne(type => TaskType, taskType => taskType.tasks)
    @JoinColumn({name: 'task_type_code'})
    taskType: TaskType;
}


@Entity('task_history')
export class TaskHistory {
    
    @PrimaryColumn({
        name: 'obj_key',
        type: 'varchar'
    })
    objectKey: string;

    @PrimaryColumn({
        name: 'task_type_code',
        type: 'varchar'
    })
    taskTypeCode: string;

    @PrimaryColumn({
        name: 'report_date',
        type: 'timestamp with time zone'
    })
    reportDate: Date;

    @Column({name: 'id'})
    id: number;

    @Column({name: 'doc_start', type: 'timestamp with time zone'})
    documentStart: Date;

    @Column({name: 'doc_end', type: 'timestamp with time zone'})
    documentEnd: Date;

    @Column({name: 'progress', type: 'int2'})
    progress: number;

    @ManyToOne(type => TaskType, taskType => taskType.taskHistories)
    @JoinColumn({name: 'task_type_code'})
    taskType: TaskType;

    @ManyToOne(type => BuildingObject, bo => bo.taskHistories)
    @JoinColumn({name: 'obj_key'})
    buildingObject: BuildingObject;

    // @ManyToOne(type => Task, task => task.taskHistory)
    // @JoinColumn({name: 'task_id'})
    // task: Task;
}