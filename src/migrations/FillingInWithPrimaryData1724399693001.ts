import { MigrationInterface, QueryRunner } from 'typeorm';

export class FillingInWithPrimaryData1724399693001
  implements MigrationInterface
{
  name = 'FillingInWithPrimaryData1724399693001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            INSERT INTO "user" ("id", "email", "password")
            VALUES (1, 'ivan@mail.ru', 'ivan');
        `);

    await queryRunner.query(`
            INSERT INTO "favorite_movie" ("id", "movieId", "isWatched", "userId")
            VALUES (1, 932086, false, 1), 
                   (2, 1048241, false, 1);
        `);

    await queryRunner.query(`
            INSERT INTO "favorite_genre" ("id", "genreId", "userId")
            VALUES (1, 37, 1);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "favorite_genre" WHERE "id" = 1;
        `);

    await queryRunner.query(`
            DELETE FROM "favorite_movie" WHERE "id" IN (1, 2);
        `);

    await queryRunner.query(`
            DELETE FROM "user" WHERE "id" = 1;
        `);
  }
}
