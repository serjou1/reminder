import { bot } from "..";
import { BotUser } from "../../../database/entities/bot-user";
import { saveUser } from "../../../database/repositories/bot-users-repository";
import { ADD_THOUGHT_BT, SETTINGS_BT } from "../constants/button-commands";
import { NONE } from "../constants/user-states";
import { ContextType } from "../context-type";
import { getUserFromContext } from "../services/users-helper";

export const handleStart = () => {
    bot.command('start', async (ctx: ContextType) => {
        let user = await getUserFromContext(ctx);
        let replyMessage: string;

        if (user) {
            replyMessage = 'Welcome back!';
        } else {
            user = new BotUser();
            user.userId = ctx.from.id;
            replyMessage = 'Welcome to reminder bot!';
        }

        await ctx.reply(replyMessage, {
            reply_markup: {
                resize_keyboard: true,
                keyboard: [
                    [ { text: ADD_THOUGHT_BT } ],
                    // [ { text: SETTINGS_BT } ]
                ]
            }
        });

        user.state = NONE;
        await saveUser(user);
    });
};