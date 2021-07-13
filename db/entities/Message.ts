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

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    messageId: number

    @Column({
        type: "text",
    })
    message: string

    @CreateDateColumn("timestamptz")
    date: Date

    @ManyToOne(() => User, user => user.messages)
    author: User

    @OneToOne(() => Room)
    @JoinColumn()
    room: Room
}
