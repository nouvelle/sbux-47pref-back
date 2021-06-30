import {MigrationInterface, QueryRunner} from "typeorm";

export class addSecretkey1625054997313 implements MigrationInterface {
    name = 'addSecretkey1625054997313'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "secretkey" TO "secretkey_id"`);
        await queryRunner.query(`CREATE TABLE "secretkey" ("id" SERIAL NOT NULL, "key" text, CONSTRAINT "PK_ea6cdd37e3b948b0a95c40dc35b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "secretkey_id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "secretkey_id" integer`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "UQ_c28827901f44ea812b8ce590911" UNIQUE ("secretkey_id")`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_c28827901f44ea812b8ce590911" FOREIGN KEY ("secretkey_id") REFERENCES "secretkey"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_c28827901f44ea812b8ce590911"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "UQ_c28827901f44ea812b8ce590911"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "secretkey_id"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "secretkey_id" text`);
        await queryRunner.query(`DROP TABLE "secretkey"`);
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "secretkey_id" TO "secretkey"`);
    }

}
