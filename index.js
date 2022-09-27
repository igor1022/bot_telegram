const express = require('express');
const server = express();
const multer  = require('multer');
const PORT = process.env.PORT || 3000;

const telegramApi = require('node-telegram-bot-api');
const token = '5679545340:AAE1vA-4eP8A6s1pjh77hMQdDjEOO0ZHwb8';

const bot = new telegramApi(token, {polling: true});
bot.setMyCommands([
    {command: '/start', description: 'Начальное приветствие'},
    {command: '/all', description: 'Начальное приветствие'},
])

bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;
    if(text === '/all') {
        const messages = await Login.find().sort('date');
        for (let i = 0; i < messages.length; i++) {
            await bot.sendMessage(chatId, `${JSON.stringify(messages[i])}`);
        }    
    }

    if(text === '/start') {
        const messages = await Login.find().sort('date');
        const date = new Date();
        for (let i = 0; i < messages.length; i++) {
            if(Number(messages[i].date) > Number(date - 3600000)) {
                console.log(Number(date));
                await bot.sendMessage(chatId, `${JSON.stringify(messages[i])}`);
            }    
        }    
    }

    //return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз!')
})

server.use(express.static('./public'));

server.set('view engine', 'ejs');
server.set('views', './views');

const upload = multer();

server.get('/', (req, res, next) => {
    res.render('main');
});

server.get('/favicon.ico', (req, res) => {
    return;
})

server.use('*', (req, res) => {
    res.render('not_found');
})
const start = async () => {
    try {
        //await mongoose.connect(`mongodb+srv://imitroshichev:account8@cluster0.gporvtq.mongodb.net/auth_roles?retryWrites=true&w=majority`)
        server.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();