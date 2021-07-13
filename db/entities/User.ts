import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    OneToMany,
} from "typeorm"
import { Room } from "./Room"
import { Message } from "./Message"

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    userId: number

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

    @Column()
    password: string

    @CreateDateColumn("timestamptz")
    registeredAt: Date

    @OneToMany(() => Room, room => room.createdBy)
    roomsCreated: Room[]

    @OneToMany(() => Room, room => room.joinedBy)
    roomsJoined: Room[]

    @OneToMany(() => Message, message => message.author)
    messages: Message[]
}
