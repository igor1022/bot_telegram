const telegramApi = require('node-telegram-bot-api');

const token = '5784875212:AAHWiU8m_zzGXX03LKQIJlBJee8rSyW-Rik';

const bot = new telegramApi(token, {polling: true});

const chats = {}

const {gameOptions, againOptions} = require('./options');

const startGame = async(chatId) => {
    await bot.sendMessage(chatId, 'Сейчас я загадаю цифру от 0 до 9, ты должен ее отдагать');
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Начальное приветствие'},
        {command: '/info', description: 'Получить информацию о пользователе'},
        {command: '/game', description: 'Игра угадай цифру'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        if(text === '/start') {
            await bot.sendSticker(chatId, 'https://cdn.tlgrm.app/stickers/06c/d14/06cd1435-9376-40d1-b196-097f5c30515c/192/2.webp')
            return bot.sendMessage(chatId, 'Добро пожаловать в телеграм бот');
        }
        if(text === '/info') {
            return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
        }
        if (text === '/game') {
            return startGame(chatId);
        }
        return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
    })
    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId);
        }
        if (data === String(chats[chatId])) {
            return bot.sendMessage(chatId, `Поздравляю ты угадал цифру ${chats[chatId]}`, againOptions);
        } else {
            return bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
        }   
    })
}

start();