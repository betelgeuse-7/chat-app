import {MigrationInterface, QueryRunner} from "typeorm";

export class sessionId1626336861427 implements MigrationInterface {
    name = 'sessionId1626336861427'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "sessionId" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sessionId"`);
    }

}
