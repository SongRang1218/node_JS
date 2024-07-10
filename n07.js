const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('안녕 세상아!');
});

app.listen(port, () => {
    console.log(`서버가 시작 되었습니다. ${port}`);
});
