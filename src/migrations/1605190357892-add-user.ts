import { MigrationInterface, QueryRunner } from 'typeorm'

export class addUser1605190357892 implements MigrationInterface {
  name = 'addUser1605190357892'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "user_role_enum" AS ENUM('super_admin', 'admin', 'manager', 'technologist')`)
    await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "firstName" character varying(50) NOT NULL, "lastName" character varying(50) NOT NULL, "login" character varying(50) NOT NULL, "email" character varying, "passwordHash" character varying, "role" "user_role_enum" NOT NULL DEFAULT 'manager', "photo" character varying, "active" boolean NOT NULL DEFAULT false, "lastActivity" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_a62473490b3e4578fd683235c5e" UNIQUE ("login"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
    await queryRunner.query(`INSERT INTO "user" ("id", "firstName", "lastName", "login", "email", "passwordHash", "role", "active", "lastActivity", "createdAt", "updatedAt") VALUES (default, 'Super', 'Admin', '${ process.env.SUPER_ADMIN_DATABASE_LOGIN }', default, '${ process.env.SUPER_ADMIN_DATABASE_PASSWORD }', 'super_admin', FALSE, default, NOW(), NOW());`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`)
    await queryRunner.query(`DROP TYPE "user_role_enum"`)
  }

}
