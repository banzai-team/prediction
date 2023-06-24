import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710081 implements MigrationInterface {
    name = '1649532710081';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            alter table task_history add column id bigserial not null;
            ALTER TABLE task_history ADD UNIQUE (id);
            alter table task add column offset_in_days int4 default 0;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
