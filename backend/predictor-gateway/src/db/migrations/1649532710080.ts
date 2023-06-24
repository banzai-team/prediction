import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710078 implements MigrationInterface {
    name = '1649532710080';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table task_history drop constraint fk_task_history_task;
        alter table task_history drop column task_id;
        alter table task_history add column report_date timestamp not null;
        alter table task_history add column obj_key varchar not null;
        alter table task_history add column task_type_code varchar not null;
        alter table task_history drop constraint task_history_pkey;
        alter table task_history drop column id;
        alter table task_history add constraint task_history_pkey primary key (obj_key, task_type_code, report_date);
        alter table task_history add constraint fk_history_task_type_code FOREIGN key (task_type_code) references task_type (code);
        alter table task_history add constraint fk_history_object_type FOREIGN key (obj_key) references building_object (obj_key);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
