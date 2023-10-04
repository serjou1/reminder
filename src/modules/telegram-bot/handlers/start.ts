import { bot } from "..";
import { BotUser } from "../../../database/entities/bot-user";
import { saveUser } from "../../../database/repositories/bot-users-repository";
import { NONE } from "../constants/user-states";
import { ContextType } from "../context-type";
import { getUserFromContext } from "../services/users-helper";

export const handleStart = () => {
    bot.command('start', async (ctx: ContextType) => {
        let user = await getUserFromContext(ctx);

        if (user) {
            await ctx.reply('Welcome back!');
        } else {
            user = new BotUser();
            user.userId = ctx.from.id;

            await ctx.reply('Welcome to reminder bot!');
        }

        user.state = NONE;
        await saveUser(user);
    });
};