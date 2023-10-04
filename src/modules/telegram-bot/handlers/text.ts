import { BotUser } from "../../../database/entities/bot-user";
import { ContextType } from "../context-type";
import { getUserFromContext } from "../services/users-helper";

const textHandlers: {
    [state: string]: (user: BotUser, ctx: ContextType) => Promise<void>
} = {};

export const textHandler = async (ctx: ContextType) => {
    const user = await getUserFromContext(ctx);
    
    const handler = textHandlers[user.state];
    if (handler) {
        await handler(user, ctx);
    }
};

export const setTextHandler = (
    state: string, 
    handler: (user: BotUser, ctx: ContextType) => Promise<void>
) => {
    textHandlers[state] = handler
};