import { bot } from "..";
import { BotUser } from "../../../database/entities/bot-user";
import { DefaultThought } from "../../../database/entities/default-thought";
import { Thought } from "../../../database/entities/thought";

export const sendThought = async (thought: Thought | DefaultThought, user: BotUser) => {
    await bot.telegram.sendMessage(user.userId, thought.text);
};