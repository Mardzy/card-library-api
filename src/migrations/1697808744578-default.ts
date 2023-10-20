import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697808744578 implements MigrationInterface {
    name = 'Default1697808744578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "serial_numbered"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "serial_numbered" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP COLUMN "serial_numbered"`);
        await queryRunner.query(`ALTER TABLE "cards" ADD "serial_numbered" text`);
    }

}
