const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('어서오세요~ express로 작동하는 서버입니다.');
});

app.get('/doc', (rep, res) => {
    res.send('문서들을 보관하고 보여주는 곳입니다.');
});

app.get('/etc', (rep, res) => {
    res.send('추가 내용입니다');
});

app.listen(port, () => {
    console.log(port + '성공적으로 서버를 시작하였습니다.');
});
