import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DefaultThought {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 1000
    })
    text: string;
}