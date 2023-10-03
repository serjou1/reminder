import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Thought } from './thought';

@Entity()
export class BotUser {
    @PrimaryColumn({
        type: 'bigint'
    })
    userId: number;

    @OneToMany(() => Thought, (thought) => thought.user)
    thoughts: Thought[];
}