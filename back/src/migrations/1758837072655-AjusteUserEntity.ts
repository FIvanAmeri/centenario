import { MigrationInterface, QueryRunner } from "typeorm";

export class AjusteUserEntity1758837072655 implements MigrationInterface {
    name = 'AjusteUserEntity1758837072655'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_cace4a159ff9f2512dd42373760"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nombre"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id_usuario" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_c5cc9eb1de424051b6c79c3307c" PRIMARY KEY ("id_usuario")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "primer_nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "correo" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_37e80954fd8499125ff14c586dd" UNIQUE ("correo")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_37e80954fd8499125ff14c586dd"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "correo"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "primer_nombre"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "PK_c5cc9eb1de424051b6c79c3307c"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "id_usuario"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "nombre" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")`);
    }

}
