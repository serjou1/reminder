import { Telegraf } from 'telegraf';
import { handleStart } from './handlers/start';
import { updateBotCommandList } from './services/commands-register';
import { sendThought } from './services/thoughts-sender';
import { message } from 'telegraf/filters';
import { textHandler } from './handlers/text';
import { registerAddThoughtHandler } from './handlers/add-thought';

export let bot: Telegraf;

export const initialize = async () => {
    bot = new Telegraf(process.env.BOT_TOKEN);

    handleStart();
    registerAddThoughtHandler();

    await updateBotCommandList();

    bot.on(message('text'), textHandler);

    bot.launch();
};

export {
    sendThought
};