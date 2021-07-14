import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from "typeorm"
import { Room } from "./Room"

import { User } from "./User"

@Entity("messages")
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    messageId: number

    @Column({
        type: "text",
    })
    message: string

    @CreateDateColumn()
    date: Date

    @ManyToOne(() => User, user => user.messages)
    author: User

    @ManyToOne(() => Room, room => room.messages)
    room: Room
}
