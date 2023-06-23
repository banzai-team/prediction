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
}

@Entity('task')
export class Task {
    
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({name: 'plan_start', type: 'timestamp with time zone'})
    plannedStart: Date;

    @Column({name: 'plan_end', type: 'timestamp with time zone'})
    plannedEnd: Date;

    @ManyToOne(type => BuildingObject, buildingObject => buildingObject.tasks)
    @JoinColumn({name: 'building_object_key'})
    buildingObject: BuildingObject;

    @ManyToOne(type => TaskType, taskType => taskType.tasks)
    @JoinColumn({name: 'task_type_code'})
    taskType: TaskType;

    @OneToMany(type => TaskHistory, taskHistory => taskHistory.task)
    taskHistory: TaskHistory[];
}


@Entity('task_history')
export class TaskHistory {
    
    @PrimaryGeneratedColumn('identity')
    id: number;

    @Column({name: 'plan_start', type: 'timestamp with time zone'})
    plannedStart: Date;

    @Column({name: 'plan_end', type: 'timestamp with time zone'})
    plannedEnd: Date;

    @ManyToOne(type => Task, task => task.taskHistory)
    @JoinColumn({name: 'task_id'})
    task: Task;
}