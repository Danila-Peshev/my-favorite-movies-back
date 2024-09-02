import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndGenreAndMovieTables1724242104935
  implements MigrationInterface
{
  name = 'CreateUserAndGenreAndMovieTables1724242104935';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "favorite_movie" ("id" SERIAL NOT NULL, "movieId" integer NOT NULL, "isWatched" boolean NOT NULL, "userId" integer, CONSTRAINT "PK_407f83234166eae1334b6f0aa87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "favorite_genre" ("id" SERIAL NOT NULL, "genreId" integer NOT NULL, "userId" integer, CONSTRAINT "PK_b8e31618cfc9cc0dba7895964a5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_movie" ADD CONSTRAINT "FK_c6eb4d54cef2f9dee16b4c92df9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_genre" ADD CONSTRAINT "FK_3cafde3da936ac04eb80088f6f1" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "favorite_genre" DROP CONSTRAINT "FK_3cafde3da936ac04eb80088f6f1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "favorite_movie" DROP CONSTRAINT "FK_c6eb4d54cef2f9dee16b4c92df9"`,
    );
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "favorite_genre"`);
    await queryRunner.query(`DROP TABLE "favorite_movie"`);
  }
}
