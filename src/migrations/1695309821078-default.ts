import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1695309821078 implements MigrationInterface {
    name = 'Default1695309821078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "manufacturer" text NOT NULL, "year" text NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "set_name" text NOT NULL, "card" text NOT NULL, "description" text NOT NULL, "team_city" text, "team_name" text, "rookie" text, "auto" text, "mem" text, "serial_numbered" text, "odds" text NOT NULL, "point" integer NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_5f3269634705fdff4a9935860fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cards" ADD CONSTRAINT "FK_a3127809fa59bcff2205e2f44b5" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cards" DROP CONSTRAINT "FK_a3127809fa59bcff2205e2f44b5"`);
        await queryRunner.query(`DROP TABLE "cards"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
