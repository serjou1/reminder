import { CronJob } from 'cron';
import { getUsersWithThoughts } from '../../database/repositories/bot-users-repository';
import { getDefaultThoughts } from '../../database/repositories/default-thoughts-repository';
import { getRandomElement } from '../../utils/random-element';
import * as telegramBot from '../telegram-bot';

export const initialize = () => {
    const job = new CronJob('0 9,21 * * *', async () => {
        try {
            console.log('Starting remind');
            
            const users = await getUsersWithThoughts();
            const defaultThoughts = await getDefaultThoughts();
            
            for (const user of users) {
                const randomThought = getRandomElement([...user.thoughts, ...defaultThoughts]);
    
                await telegramBot.sendThought(randomThought, user);
            }
        } catch (e) { 
            console.log(e);
        }
    }, null, true, "Europe/Kiev");
    job.start();
};