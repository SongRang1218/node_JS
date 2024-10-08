const e = require('express');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    session({
        secret: 'pw123456',
        resave: false,
        saveUninitialized: true,
    })
);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'swm',
    port: 3306,
    password: '1234',
    database: 'web2',
});

db.connect((error) => {
    if (error) {
        console.log('접속실패~~~~');
        return;
    }
    console.log('접속에 실패하셨습니다');
});

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/test.html');
        console.log('웹에 정상 접속 하였습니다.');
    } else {
        res.sendFile(__dirname + '/index.html');
    }
});

app.get('/login', (req, res) => {
    const { ID, PW } = req.body;
    db.query(`SELECT count(*) FROM test WHERE ID=${ID} AND PW=${PW} `, (err, results) => {
        console.log('results');
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
