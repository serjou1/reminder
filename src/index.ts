import * as telegramBot from './modules/telegram-bot';
import * as reminder from './modules/reminder';
import { initizlizeDataSource } from './database/data-source';

const start = async () => {
    await initizlizeDataSource()

    await telegramBot.initialize();
    reminder.initialize();
};

start();