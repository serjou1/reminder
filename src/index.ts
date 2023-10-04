import * as telegramBot from './modules/telegram-bot';
import * as reminder from './modules/reminder';
import { initizlizeDataSource } from './database/data-source';

import * as dotenv from 'dotenv';

const start = async () => {
    dotenv.config({
        path: './.env'
    })

    await initizlizeDataSource()
    await telegramBot.initialize();
    reminder.initialize();
};

start();