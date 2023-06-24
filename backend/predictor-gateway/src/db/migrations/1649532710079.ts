import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1649532710078 implements MigrationInterface {
    name = 'Initial1649532710078';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX task_type_code ON task ( task_type_code );
            CREATE INDEX task_building_object_key ON task ( building_object_key );
            alter table task add constraint obj_task_type_unique UNIQUE (task_type_code , building_object_key);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

    }
}
