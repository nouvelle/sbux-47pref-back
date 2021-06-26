import {MigrationInterface, QueryRunner} from "typeorm";

export class firstSchema1624735661629 implements MigrationInterface {
    name = 'firstSchema1624735661629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pref" ("id" integer NOT NULL, "name" text NOT NULL, "nameJP" text NOT NULL, "lat" numeric NOT NULL, "lng" numeric NOT NULL, "zoom" numeric NOT NULL, "clusterZoom" numeric NOT NULL, "drink" text NOT NULL, CONSTRAINT "PK_964f002270e05dbef2af37b37ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" integer NOT NULL, "tag" text NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, "image" text, "comments" text, "author" text NOT NULL, "secretkey" text, "snshandle" text, "tag" text, "pref_id" integer, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts_tags" ("postsId" integer NOT NULL, "tagsId" integer NOT NULL, CONSTRAINT "PK_af443546fce87648e2c2ba411c4" PRIMARY KEY ("postsId", "tagsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_43eb26a55c240c71497c76f281" ON "posts_tags" ("postsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_56be2a177c90e0adf8444f2e36" ON "posts_tags" ("tagsId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_d20d3e9c19b396c328049e92f6d" FOREIGN KEY ("pref_id") REFERENCES "pref"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_43eb26a55c240c71497c76f2812" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "posts_tags" ADD CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_56be2a177c90e0adf8444f2e36c"`);
        await queryRunner.query(`ALTER TABLE "posts_tags" DROP CONSTRAINT "FK_43eb26a55c240c71497c76f2812"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_d20d3e9c19b396c328049e92f6d"`);
        await queryRunner.query(`DROP INDEX "IDX_56be2a177c90e0adf8444f2e36"`);
        await queryRunner.query(`DROP INDEX "IDX_43eb26a55c240c71497c76f281"`);
        await queryRunner.query(`DROP TABLE "posts_tags"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "pref"`);
    }

}
