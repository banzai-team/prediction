import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710083 implements MigrationInterface {
    name = '1649532710083';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table task_history alter column report_date drop not null;
        alter table task_history drop constraint task_history_pkey;
        alter table task_history add constraint task_history_pkey primary key (id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
