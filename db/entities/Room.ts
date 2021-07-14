import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    ManyToOne,
    OneToMany,
} from "typeorm"
import { User } from "./User"
import { Message } from "./Message"

@Entity("rooms")
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

    @CreateDateColumn()
    createdAt: Date

    @OneToMany(() => Message, message => message.room)
    messages: Message[]
}
