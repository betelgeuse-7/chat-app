import {MigrationInterface, QueryRunner} from "typeorm";

export class roomMessages1626258451016 implements MigrationInterface {
    name = 'roomMessages1626258451016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("userId" SERIAL NOT NULL, "username" character varying(155) NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "rooms" ("roomId" SERIAL NOT NULL, "roomName" character varying(255) NOT NULL, "roomCode" character varying(8) NOT NULL, "roomPassword" character varying(55), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdByUserId" integer, CONSTRAINT "UQ_218122bdbe19989effd16195807" UNIQUE ("roomCode"), CONSTRAINT "PK_31962cf242c2fdc6889493d9a99" PRIMARY KEY ("roomId"))`);
        await queryRunner.query(`CREATE TABLE "messages" ("messageId" SERIAL NOT NULL, "message" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "authorUserId" integer, "roomRoomId" integer, CONSTRAINT "REL_e36c102882a8f84b53ecab6b75" UNIQUE ("roomRoomId"), CONSTRAINT "PK_9743b3cec687ac55895f0d79ae0" PRIMARY KEY ("messageId"))`);
        await queryRunner.query(`CREATE TABLE "users_rooms_joined_rooms" ("usersUserId" integer NOT NULL, "roomsRoomId" integer NOT NULL, CONSTRAINT "PK_e4ae9a2b8d62e3adeb84a06d9e7" PRIMARY KEY ("usersUserId", "roomsRoomId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4dc6e677cdce46a258c035a7b2" ON "users_rooms_joined_rooms" ("usersUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f8d8c319322d8aaafbcdc59b45" ON "users_rooms_joined_rooms" ("roomsRoomId") `);
        await queryRunner.query(`ALTER TABLE "rooms" ADD CONSTRAINT "FK_d87c0e996d5e1ab71e940c8137a" FOREIGN KEY ("createdByUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_ddb84fe04b9750c677fdad498d1" FOREIGN KEY ("authorUserId") REFERENCES "users"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "messages" ADD CONSTRAINT "FK_e36c102882a8f84b53ecab6b754" FOREIGN KEY ("roomRoomId") REFERENCES "rooms"("roomId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users_rooms_joined_rooms" ADD CONSTRAINT "FK_4dc6e677cdce46a258c035a7b28" FOREIGN KEY ("usersUserId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_rooms_joined_rooms" ADD CONSTRAINT "FK_f8d8c319322d8aaafbcdc59b451" FOREIGN KEY ("roomsRoomId") REFERENCES "rooms"("roomId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_rooms_joined_rooms" DROP CONSTRAINT "FK_f8d8c319322d8aaafbcdc59b451"`);
        await queryRunner.query(`ALTER TABLE "users_rooms_joined_rooms" DROP CONSTRAINT "FK_4dc6e677cdce46a258c035a7b28"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_e36c102882a8f84b53ecab6b754"`);
        await queryRunner.query(`ALTER TABLE "messages" DROP CONSTRAINT "FK_ddb84fe04b9750c677fdad498d1"`);
        await queryRunner.query(`ALTER TABLE "rooms" DROP CONSTRAINT "FK_d87c0e996d5e1ab71e940c8137a"`);
        await queryRunner.query(`DROP INDEX "IDX_f8d8c319322d8aaafbcdc59b45"`);
        await queryRunner.query(`DROP INDEX "IDX_4dc6e677cdce46a258c035a7b2"`);
        await queryRunner.query(`DROP TABLE "users_rooms_joined_rooms"`);
        await queryRunner.query(`DROP TABLE "messages"`);
        await queryRunner.query(`DROP TABLE "rooms"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
