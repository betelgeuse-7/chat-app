import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
} from "typeorm"
import { User } from "./User"

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn()
    roomId: number

    @Column({
        type: "varchar",
        length: 255,
    })
    roomName: string

    @Column({
        type: "varchar",
        length: 8,
        unique: true,
    })
    roomCode: string

    @Column({
        type: "varchar",
        length: 55,
        nullable: true,
    })
    roomPassword: string

    @ManyToOne(() => User, user => user.roomsCreated)
    createdBy: User

    @ManyToOne(() => User, user => user.roomsJoined)
    joinedBy: User

    @CreateDateColumn("timestamptz")
    createdAt: Date
}
