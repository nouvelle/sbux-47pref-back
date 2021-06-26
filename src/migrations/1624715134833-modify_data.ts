import {MigrationInterface, QueryRunner} from "typeorm";

export class modifyData1624715134833 implements MigrationInterface {
    name = 'modifyData1624715134833'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "visited_date" TO "created_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" RENAME COLUMN "created_at" TO "visited_date"`);
    }

}
