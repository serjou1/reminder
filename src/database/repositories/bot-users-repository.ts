import { FindOptionsWhere } from "typeorm";
import { AppDataSource } from "../data-source";
import { BotUser } from "../entities/bot-user";

export const getUsers = async (
    where: FindOptionsWhere<BotUser> | FindOptionsWhere<BotUser>[] = undefined
): Promise<BotUser[]> => {
    return await AppDataSource.getRepository(BotUser).find({
        where
    });
};

export const getUsersWithThoughts = async (): Promise<BotUser[]> => {
    return await AppDataSource.getRepository(BotUser).find({
        relations: {
            thoughts: true
        }
    });
}

export const saveUser = async (user: BotUser) => {
    await AppDataSource.getRepository(BotUser).save(user);
}