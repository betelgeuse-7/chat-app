import {MigrationInterface, QueryRunner} from "typeorm";

export class frustrated1626260051426 implements MigrationInterface {
    name = 'frustrated1626260051426'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e36c102882a8f84b53ecab6b754"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "REL_e36c102882a8f84b53ecab6b75"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e36c102882a8f84b53ecab6b754" FOREIGN KEY ("roomRoomId") REFERENCES "rooms"("roomId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e36c102882a8f84b53ecab6b754"`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "REL_e36c102882a8f84b53ecab6b75" UNIQUE ("roomRoomId")`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e36c102882a8f84b53ecab6b754" FOREIGN KEY ("roomRoomId") REFERENCES "rooms"("roomId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
