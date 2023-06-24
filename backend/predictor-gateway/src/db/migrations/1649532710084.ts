import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710084 implements MigrationInterface {
    name = '1649532710084';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        alter table task alter column offset_in_days drop default;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
