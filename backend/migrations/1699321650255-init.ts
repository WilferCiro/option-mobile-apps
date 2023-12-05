import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1699321650255 implements MigrationInterface {
    name = 'Init1699321650255'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "story" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "year" integer NOT NULL, "keywords" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_28fce6873d61e2cace70a0f3361" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "firstName" character varying(100) NOT NULL, "lastName" character varying(100) NOT NULL, "phone" character varying(15), "password" character varying(300) NOT NULL, "email" character varying(300) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "story"`);
    }

}
