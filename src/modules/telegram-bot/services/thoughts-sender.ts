import { bot } from "..";
import { Thought } from "../../../database/entities/thought";

export const sendThought = async (thought: Thought) => {
    await bot.telegram.sendMessage(thought.user.userId, thought.text);
};