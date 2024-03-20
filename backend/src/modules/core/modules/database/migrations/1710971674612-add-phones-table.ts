import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPhonesTable1710971674612 implements MigrationInterface {
  public name = 'AddPhonesTable1710971674612';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "number" character varying NOT NULL, "userId" uuid, CONSTRAINT "UQ_f6f7db95ce37aa48d13c1333ac6" UNIQUE ("number"), CONSTRAINT "PK_30d7fc09a458d7a4d9471bda554" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "phones" ADD CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "phones" DROP CONSTRAINT "FK_fa1d95d0c615b8f040ae4179955"`);
    await queryRunner.query(`DROP TABLE "phones"`);
  }
}
