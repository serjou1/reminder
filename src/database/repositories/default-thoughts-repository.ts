import { AppDataSource } from "../data-source"
import { DefaultThought } from "../entities/default-thought"

export const getDefaultThoughts = async (): Promise<DefaultThought[]> => {
    return await AppDataSource.getRepository(DefaultThought).find();
};