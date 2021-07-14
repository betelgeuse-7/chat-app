import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1626256638964 implements MigrationInterface {
    name = 'firstMigration1626256638964'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userId" SERIAL NOT NULL, "username" character varying(155) NOT NULL, "email" character varying(255) NOT NULL, "password" text NOT NULL, "registeredAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_d72ea127f30e21753c9e229891e" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "room" ("roomId" SERIAL NOT NULL, "roomName" character varying(255) NOT NULL, "roomCode" character varying(8) NOT NULL, "roomPassword" character varying(55), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "createdByUserId" integer, CONSTRAINT "UQ_ed1cf5b851e5b2893251111fd79" UNIQUE ("roomCode"), CONSTRAINT "PK_45770efde052e41dee06d89c85c" PRIMARY KEY ("roomId"))`);
        await queryRunner.query(`CREATE TABLE "message" ("messageId" SERIAL NOT NULL, "message" text NOT NULL, "date" TIMESTAMP NOT NULL DEFAULT now(), "authorUserId" integer, "roomRoomId" integer, CONSTRAINT "REL_0619945d0d4e15ff188032354a" UNIQUE ("roomRoomId"), CONSTRAINT "PK_b664c8ae63d634326ce5896cecc" PRIMARY KEY ("messageId"))`);
        await queryRunner.query(`CREATE TABLE "user_rooms_joined_room" ("userUserId" integer NOT NULL, "roomRoomId" integer NOT NULL, CONSTRAINT "PK_df3a13300b907bc338cd2e6a931" PRIMARY KEY ("userUserId", "roomRoomId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f5f13f0eda545c9f7f156cfad8" ON "user_rooms_joined_room" ("userUserId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3b8f5447a314034f6862201dad" ON "user_rooms_joined_room" ("roomRoomId") `);
        await queryRunner.query(`ALTER TABLE "room" ADD CONSTRAINT "FK_5f2fe399cc7204fc92466f596e5" FOREIGN KEY ("createdByUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_641d5701ac78afad27165208d48" FOREIGN KEY ("authorUserId") REFERENCES "user"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "message" ADD CONSTRAINT "FK_0619945d0d4e15ff188032354a5" FOREIGN KEY ("roomRoomId") REFERENCES "room"("roomId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_rooms_joined_room" ADD CONSTRAINT "FK_f5f13f0eda545c9f7f156cfad8b" FOREIGN KEY ("userUserId") REFERENCES "user"("userId") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_rooms_joined_room" ADD CONSTRAINT "FK_3b8f5447a314034f6862201dada" FOREIGN KEY ("roomRoomId") REFERENCES "room"("roomId") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rooms_joined_room" DROP CONSTRAINT "FK_3b8f5447a314034f6862201dada"`);
        await queryRunner.query(`ALTER TABLE "user_rooms_joined_room" DROP CONSTRAINT "FK_f5f13f0eda545c9f7f156cfad8b"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_0619945d0d4e15ff188032354a5"`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_641d5701ac78afad27165208d48"`);
        await queryRunner.query(`ALTER TABLE "room" DROP CONSTRAINT "FK_5f2fe399cc7204fc92466f596e5"`);
        await queryRunner.query(`DROP INDEX "IDX_3b8f5447a314034f6862201dad"`);
        await queryRunner.query(`DROP INDEX "IDX_f5f13f0eda545c9f7f156cfad8"`);
        await queryRunner.query(`DROP TABLE "user_rooms_joined_room"`);
        await queryRunner.query(`DROP TABLE "message"`);
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
