const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const port = 3000;

const Message = mongoose.model('Message', {message: String, date: Date});

async function connect() {
    return await mongoose.connect('mongodb://mongo:27017/admin', {
        useNewUrlParser: true,
        user: 'root',
        pass: 'example'
    });
}

app.get('/hello/', async (req, res) => {
    res.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', '*');

    const json = {message: 'Hello API from node Express!'};

    return res.json(json);
});

app.options('/messages/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', '*');

    res.sendStatus(201);
});

app.get('/messages/', async (req, res) => {
    res.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', '*');

    try {
        await connect();

        const messages = await Message.find().sort({date: -1}).limit(3);

        return res.json(messages);
    } catch (e) {
        console.error(e);

        res.sendStatus(500);
    }
});

app.post('/messages/', async (req, res) => {
    res.set('Access-Control-Allow-Methods', 'POST');
    res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', '*');

    try {
        console.debug(req.body);

        if (!req.body || !req.body.message) {
            res.sendStatus(400);

            return;
        }

        await connect();

        const message = new Message({message: req.body.message, date: new Date()});
        const newMessage = await message.save();

        console.log(`added ${newMessage.message}`);

        return res.json(newMessage);
    } catch (e) {
        console.error(e);

        res.sendStatus(500);
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
