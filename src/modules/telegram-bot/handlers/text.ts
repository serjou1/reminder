import { BotUser } from "../../../database/entities/bot-user";
import { ContextType } from "../context-type";
import { getUserFromContext } from "../services/users-helper";

const textHandlers: {
    [state: string]: (user: BotUser, ctx: ContextType) => Promise<void>
} = {};

const buttonHandlers: {
    [buttonText: string]: (ctx: ContextType) => Promise<void>
} = {};

export const textHandler = async (ctx: ContextType) => {
    if (await handleButtonPress(ctx)) {
        return;
    }

    await handleText(ctx);
};

export const setTextHandler = (
    state: string, 
    handler: (user: BotUser, ctx: ContextType) => Promise<void>
) => {
    textHandlers[state] = handler
};

export const setButtonHandler = (
    buttonText: string,
    handler: (ctx: ContextType) => Promise<void>
) => {
    buttonHandlers[buttonText] = handler;
};

const handleButtonPress = async (ctx: ContextType): Promise<boolean> => {
    const handler = buttonHandlers[ctx.message.text];
    if (handler) {
        await handler(ctx);
        return true;
    }

    return false;
};

const handleText = async (ctx: ContextType) => {
    const user = await getUserFromContext(ctx);

    const handler = textHandlers[user.state];
    if (handler) {
        await handler(user, ctx);
    }
};