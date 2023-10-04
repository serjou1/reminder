import { Context, Middleware, NarrowedContext } from "telegraf";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { bot } from "..";

const commands: { command: string, description: string }[] = [];

export const registerCommand = (
    command: string,
    description: string,
    commandFunction: Middleware<NarrowedContext<Context<Update>, { message: Update.New & Update.NonChannel & Message.TextMessage; update_id: number; }>>
) => {
    bot.command(command, commandFunction);
    commands.push({command, description});
};

export const updateBotCommandList = async () => {
    await bot.telegram.setMyCommands(commands);
};