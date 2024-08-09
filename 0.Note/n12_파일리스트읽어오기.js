const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(logger('tiny'));

app.use('/', express.static(__dirname + '/HTML'));
app.get('/list', (req, res) => {
    fs.readdir(__dirname + '/HTML', 'utf-8', (err, data) => {
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(port + '에서 서버가 연결되었습니다.');
});
