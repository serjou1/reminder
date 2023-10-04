import { AppDataSource } from "../data-source";
import { Thought } from "../entities/thought";

export const saveThought = async (thought: Thought) => {
    await AppDataSource.getRepository(Thought).save(thought);
};