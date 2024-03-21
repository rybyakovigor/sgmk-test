import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAvatarToUser1711042602446 implements MigrationInterface {
  public name = 'AddAvatarToUser1711042602446';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "avatar" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "avatar"`);
  }
}
