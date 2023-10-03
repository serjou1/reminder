import { CronJob } from 'cron';
import { getUsers } from '../../database/repositories/bot-users-repository';
import { getRandomElement } from '../../utils/random-element';
import * as telegramBot from '../telegram-bot';

export const initialize = () => {
    const job = new CronJob('0 9,21 * * *', async () => {
        const users = await getUsers();
        for (const user of users) {
            // get random thought or quote
            const randomThought = getRandomElement(user.thoughts);

            // send thought
            await telegramBot.sendThought(randomThought);
        }
    });
    job.start();
};