const express = require('express');
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(logger('tiny')); //"tiny"

app.get('/', (req, res) => {
    res.send('반가워요');
});

app.get('/book', (req, res) => {
    //   let u_name = req.param('uname');
    //   let b_name = req.param('bname');
    let u_name = req.query.uname;
    let b_name = req.query.bname;
    let date = req.query.date;
    console.log(u_name, b_name);
    res.send('<h2>저자: ' + u_name + '</h2><h2>도서명:' + b_name + '</h2>' + '<h2>출판일 :' + date + '</h2>');
});

app.listen(port, () => {
    console.log(port + '성공적으로 서버를 시작하였습니다.');
});
