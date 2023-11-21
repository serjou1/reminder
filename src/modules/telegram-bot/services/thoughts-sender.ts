import { log } from "console";
import { TelegramError } from "telegraf";
import { bot } from "..";
import { BotUser } from "../../../database/entities/bot-user";
import { DefaultThought } from "../../../database/entities/default-thought";
import { Thought } from "../../../database/entities/thought";

export const sendThought = async (thought: Thought | DefaultThought, user: BotUser) => {
    try {
        await bot.telegram.sendMessage(user.userId, thought.text);
    } catch (e) {
        if (e instanceof TelegramError && e.code == 403) {
            log(`User ${user.userId} has blocked bot`);
        } else {
            throw e;
        }
    }
};