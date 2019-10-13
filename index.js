const express = require('express');
const app = express();
const port = 3000;

app.get('/hello/', (req, res) => {
    res.set('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.set('Access-Control-Allow-Headers', 'Authorization,Content-Type');
    res.set('Access-Control-Allow-Credentials', 'true');
    res.set('Access-Control-Allow-Origin', '*');

    const json = {message: 'Hello API from node Express!'};

    return res.json(json);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
