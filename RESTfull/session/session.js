const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); //모듈 import. Express v4.16.0이상은 생략 가능
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extends: true }));
app.use(
    session({
        secret: 'pw123456',
        resave: false,
        saveUninitialized: true,
    })
);

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.send(`<h2>${req.session.username}님 어서온나</h2>
            <h2>${req.session.username}님 개인 화면입니다</h2>
            <h3>데이터 베이스 목록</h3>
            <button onclick="location.href='/logout'">나가기</button>`);
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});
app.get('/logout', (req, res) => {
    req.session.destroy((e) => {
        if (e) console.error(e);
        res.send(`<script>alert('로그아웃 되엇습니다~');window.location.href='/'</script>`);
    });
});

app.get('/login', (req, res) => {
    res.send(`
        <!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
    </head>
    <body>
        <form action="" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" />
            <label for="pw">Password:</label>
            <input type="password" id="pw" name="password" />
            <button type="submit">Login</button>
        </form>
    </body>
</html>`);
});

app.post('/login', (req, res) => {
    const { username, password } = req.body; // query 는 get 방식
    if (username === 'test' && password == '1234') {
        req.session.loggedIn = true;
        req.session.username = username;
        res.redirect('/');
    } else {
        res.send(`<h3>흥 어림없는소리</h3>
            <button onclick="location.href='/'">빠꾸</button>`);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
