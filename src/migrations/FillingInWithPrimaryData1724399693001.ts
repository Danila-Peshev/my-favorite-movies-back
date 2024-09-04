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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DELETE FROM "user" WHERE "id" = 1;
        `);
  }
}
