import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1697725745240 implements MigrationInterface {
    name = 'Default1697725745240'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "odds" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" ALTER COLUMN "odds" SET NOT NULL`);
    }

}
