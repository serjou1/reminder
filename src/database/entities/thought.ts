import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BotUser } from './bot-user';

@Entity()
export class Thought {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000
    })
    text: string;

    @ManyToOne(() => BotUser, (user) => user.thoughts)
    user: BotUser;
}