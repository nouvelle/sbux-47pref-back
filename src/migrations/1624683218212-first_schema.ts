import {MigrationInterface, QueryRunner} from "typeorm";

export class firstSchema1624683218212 implements MigrationInterface {
    name = 'firstSchema1624683218212'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store_info" ("id" SERIAL NOT NULL, "store_name" text NOT NULL, "address" text NOT NULL, "office_hour" text NOT NULL, "wifi" text NOT NULL, "lat" numeric, "lng" numeric, "location_type" text, "listed" boolean, "transaction_date" TIMESTAMP WITH TIME ZONE NOT NULL, "pref_id" integer, CONSTRAINT "PK_7ea57858decfc43b19d7734e0df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pref" ("id" integer NOT NULL, "name" text NOT NULL, "nameJP" text, "lat" numeric, "lng" numeric, "zoom" numeric, "clusterZoom" numeric, "drink" text NOT NULL, CONSTRAINT "PK_964f002270e05dbef2af37b37ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer NOT NULL, "tag" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "visited_date" TIMESTAMP WITH TIME ZONE NOT NULL, "image" text, "comments" text NOT NULL, "author" text NOT NULL, "secretkey" text NOT NULL, "snshandle" text NOT NULL, "tag" text NOT NULL, "pref_id" integer, "store_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_af443546fce87648e2c2ba411c4" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43eb26a55c240c71497c76f281" ON "posts_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_56be2a177c90e0adf8444f2e36" ON "posts_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "store_info" ADD CONSTRAINT "FK_0b190bdb57f3523b23520c291ea" FOREIGN KEY ("pref_id") REFERENCES "pref"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_d20d3e9c19b396c328049e92f6d" FOREIGN KEY ("pref_id") REFERENCES "pref"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_143305a0da700e1d6b5bd3e0d11" FOREIGN KEY ("store_id") REFERENCES "store_info"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_43eb26a55c240c71497c76f2812" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c"`);
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_43eb26a55c240c71497c76f2812"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_143305a0da700e1d6b5bd3e0d11"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_d20d3e9c19b396c328049e92f6d"`);
        await queryRunner.query(`ALTER TABLE "store_info" DROP CONSTRAINT "FK_0b190bdb57f3523b23520c291ea"`);
        await queryRunner.query(`DROP INDEX "IDX_56be2a177c90e0adf8444f2e36"`);
        await queryRunner.query(`DROP INDEX "IDX_43eb26a55c240c71497c76f281"`);
        await queryRunner.query(`DROP TABLE "posts_tags"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "pref"`);
        await queryRunner.query(`DROP TABLE "store_info"`);
    }

}
