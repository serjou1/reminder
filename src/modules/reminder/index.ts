import { CronJob } from 'cron';
import { getUsersWithThoughts } from '../../database/repositories/bot-users-repository';
import { getRandomElement } from '../../utils/random-element';
import * as telegramBot from '../telegram-bot';

export const initialize = () => {
    const job = new CronJob('* 9,19 * * *', async () => {
        try {
            console.log('Starting remind');
            
            const users = await getUsersWithThoughts();
            console.log(JSON.stringify(users, null, 4));
            
            for (const user of users) {
                if (user.thoughts.length === 0) {
                    continue;
                }

                const randomThought = getRandomElement(user.thoughts);
    
                await telegramBot.sendThought(randomThought);
            }
        } catch (e) { 
            console.log(e);
        }
    });
    job.start();
};