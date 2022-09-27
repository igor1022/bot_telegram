const express = require('express');
const server = express();
const multer  = require('multer');
const PORT = process.env.PORT || 3000;

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