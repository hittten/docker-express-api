const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

const port = 3000;

const Message = mongoose.model('Message', new mongoose.Schema({text: 'string', date: 'date'}));

async function connect() {
  return await mongoose.connect(`mongodb://${process.env.dbHost}/admin`, {
    useNewUrlParser: true,
    user: process.env.dbUser,
    pass: process.env.dbPass,
  });
}

app.get('/messages/', async (req, res) => {
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
  try {
    if (!req.body || !req.body.text) {
      console.debug(req.body);
      return res.sendStatus(400).end();
    }

    await connect();

    const message = new Message({text: req.body.text, date: new Date()});
    const newMessage = await message.save();

    console.log(`added ${newMessage}`);

    return res.json(newMessage);
  } catch (e) {
    console.error(e);

    res.sendStatus(500);
  }
});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
