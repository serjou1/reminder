import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Thought } from './thought';

@Entity()
export class BotUser {
    @PrimaryColumn({
        type: 'bigint'
    })
    userId: number;

    @Column()
    state: string;

    @OneToMany(() => Thought, (thought) => thought.user)
    thoughts: Thought[];
}