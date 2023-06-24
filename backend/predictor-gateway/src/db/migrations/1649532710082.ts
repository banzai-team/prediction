import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710082 implements MigrationInterface {
    name = '1649532710082';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table task_type alter column name drop not null;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
