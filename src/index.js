const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();
app.use(cors())

const port = 3000;

const Message = mongoose.model('Message', {message: String, date: Date});

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
