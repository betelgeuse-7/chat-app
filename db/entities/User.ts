import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { Room } from "./Room"
import { Message } from "./Message"

@Entity("users")
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number

    @Column({
        type: "text",
        nullable: true,
    })
    sessionId: string

    @Column({
        type: "varchar",
        length: 155,
        unique: true,
    })
    username: string

    @Column({
        type: "varchar",
        length: 255,
        unique: true,
    })
    email: string

    @Column({
        type: "text",
    })
    password: string

    @CreateDateColumn()
    registeredAt: Date

    @OneToMany(() => Room, room => room.createdBy)
    roomsCreated: Room[]

    @ManyToMany(() => Room)
    @JoinTable()
    roomsJoined: Room[]

    @OneToMany(() => Message, message => message.author)
    messages: Message[]
}
