import { ContextType } from '../context-type';
import { getUsers } from "../../../database/repositories/bot-users-repository";

export const getUserFromContext = async (ctx: ContextType) => {
    const userId = ctx.from.id;
    const users = await getUsers({userId});
    if (users.length > 0) {
        return users[0];
    }

    return null;
}