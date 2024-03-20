import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUsersTable1710960387480 implements MigrationInterface {
  public name = 'AddUsersTable1710960387480';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "surname" character varying NOT NULL, "patronymic" character varying NOT NULL, "city" character varying NOT NULL, "street" character varying NOT NULL, "house" character varying NOT NULL, "flat" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
