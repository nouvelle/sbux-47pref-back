import {MigrationInterface, QueryRunner} from "typeorm";

export class addIspost1624929256261 implements MigrationInterface {
    name = 'addIspost1624929256261'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pref" ADD "is_post" boolean DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pref" DROP COLUMN "is_post"`);
    }

}
