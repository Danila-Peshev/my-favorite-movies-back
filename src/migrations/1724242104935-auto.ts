import { MigrationInterface, QueryRunner } from "typeorm";

export class Auto1724242104935 implements MigrationInterface {
    name = 'Auto1724242104935'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_favorite_movie" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_8e16c3b674ab75e863ed4fc0785" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorite_genre" ("id" SERIAL NOT NULL, "genreId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_aa705abd1c61222a5c99c69bc6b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_watched_movie" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_29981209fac2af722baefa3fb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_favorite_movie" ADD CONSTRAINT "FK_372589f6d779a3ff8a3ae7290f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_favorite_genre" ADD CONSTRAINT "FK_1db1d23cd6c3509185f6c18af55" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_watched_movie" ADD CONSTRAINT "FK_f3c07f6f95280283c18c2675913" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_watched_movie" DROP CONSTRAINT "FK_f3c07f6f95280283c18c2675913"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_genre" DROP CONSTRAINT "FK_1db1d23cd6c3509185f6c18af55"`);
        await queryRunner.query(`ALTER TABLE "user_favorite_movie" DROP CONSTRAINT "FK_372589f6d779a3ff8a3ae7290f3"`);
        await queryRunner.query(`DROP TABLE "user_watched_movie"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "user_favorite_genre"`);
        await queryRunner.query(`DROP TABLE "user_favorite_movie"`);
    }

}
