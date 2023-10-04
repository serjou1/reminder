import "reflect-metadata";
import { DataSource } from "typeorm";
import { BotUser } from "./entities/bot-user";
import { DefaultThought } from "./entities/default-thought";
import { Thought } from "./entities/thought";

export let AppDataSource: DataSource;

export const initizlizeDataSource = async () => {
    AppDataSource = new DataSource({
        type: "mysql",
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        synchronize: true,
        logging: false,
        entities: [
            BotUser,
            Thought,
            DefaultThought
        ],
        subscribers: [],
        charset: 'utf8mb4'
    });

    await AppDataSource.initialize();
};