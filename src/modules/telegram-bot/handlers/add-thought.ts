import { BotUser } from "../../../database/entities/bot-user";
import { Thought } from "../../../database/entities/thought";
import { saveUser } from "../../../database/repositories/bot-users-repository";
import { saveThought } from "../../../database/repositories/thoughts-repository";
import { ADD_THOUGHT_BT } from "../constants/button-commands";
import { ADD_THOUGHT, NONE } from "../constants/user-states";
import { ContextType } from "../context-type";
import { registerCommand } from "../services/commands-register";
import { getUserFromContext } from "../services/users-helper";
import { setButtonHandler, setTextHandler } from "./text";

export const registerAddThoughtHandler = () => {
    registerCommand(
        'addthought',
        'Добавить мысль или цитату',
        addThought
    );

    setButtonHandler(ADD_THOUGHT_BT, addThought);
    setTextHandler(ADD_THOUGHT, textHandler);
};

const addThought = async (ctx: ContextType) => {
    const user = await getUserFromContext(ctx);
    
    await ctx.reply('Write your thought');

    user.state = ADD_THOUGHT;
    await saveUser(user);
};

const textHandler = async (user: BotUser, ctx: ContextType) => {
    const text = ctx.message.text;
    const thought = new Thought();
    thought.text = text;
    thought.user = user;

    await saveThought(thought);

    user.state = NONE;
    await saveUser(user);

    await ctx.reply('Thought saved');
};