import { Telegraf } from 'telegraf';
import { BotUser } from '../../database/entities/bot-user';
import { getUsers, saveUser } from '../../database/repositories/bot-users-repository';
import { ContextType } from './context-type';
import { sendThought } from './services/thoughts-sender';

export let bot: Telegraf;

export const initialize = async () => {
    bot = new Telegraf(process.env.BOT_TOKEN);

    bot.command('start', async (ctx: ContextType) => {
        const users = await getUsers({
            userId: ctx.from.id
        });

        if (users.length !== 0) {
            await ctx.reply('Welcome back!');

            return;
        }

        const user = new BotUser();
        user.userId = ctx.from.id;

        await saveUser(user);

        await ctx.reply('Welcome to reminder bot!');
    })

    await bot.launch();
};

export {
    sendThought
};