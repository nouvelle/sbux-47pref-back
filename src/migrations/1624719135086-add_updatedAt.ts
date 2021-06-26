import {MigrationInterface, QueryRunner} from "typeorm";

export class addUpdatedAt1624719135086 implements MigrationInterface {
    name = 'addUpdatedAt1624719135086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "updated_at"`);
    }

}
