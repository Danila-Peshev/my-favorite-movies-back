import { In, MigrationInterface, QueryRunner } from 'typeorm';

export class Fill1724399693001 implements MigrationInterface {
  name = 'Fill1724399693001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO "user" ("id", "email", "password")
        VALUES (1, 'ivan@mail.ru', 'ivan');
    `);

    await queryRunner.query(`
        INSERT INTO "user_favorite_movie" ("id", "movieId", "userId")
        VALUES (1, 932086, 1), 
               (2, 1048241, 1);
    `);

    await queryRunner.query(`
        INSERT INTO "user_favorite_genre" ("id", "genreId", "userId")
        VALUES (1, 37, 1);
    `);

    await queryRunner.query(`
        INSERT INTO "user_watched_movie" ("id", "movieId", "userId")
        VALUES (1, 932086, 1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM "user_watched_movie" WHERE "id" = 1;
    `);

    await queryRunner.query(`
        DELETE FROM "user_favorite_genre" WHERE "id" = 1;
    `);

    await queryRunner.query(`
        DELETE FROM "user_favorite_movie" WHERE "id" IN (1, 2);
    `);

    await queryRunner.query(`
        DELETE FROM "user" WHERE "id" = 1;
    `);
  }
}
