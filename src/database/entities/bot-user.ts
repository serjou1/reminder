import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Thought } from './thought';

@Entity()
export class BotUser {
    @PrimaryColumn()
    userId: number;

    @OneToMany(() => Thought, (thought) => thought.user)
    thoughts: Thought[];
}