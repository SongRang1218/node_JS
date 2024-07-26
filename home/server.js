const e = require('express');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;
const session = require('express-session');
const bodyParser = require('body-parser'); //모듈 import. Express v4.16.0이상은 생략 가능

app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createConnection({
    host: 'localhost',
    user: 'swm',
    port: 3306,
    password: '1234',
    database: 'test_db',
});

db.connect((error) => {
    if (error) {
        console.log('접속실패~~~~');
        return;
    }
    console.log('MySQL Connected!');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
    console.log('웹에 정상 접속 하였습니다.');
});

app.post('/', (req, res) => {
    const { username, password } = req.body; // query 는 get 방식
    const idOK = /^[A-Za-z]{1,8}$/g.test(username); //방법 1. true or false 변환
    const pwOK = password.match(/^[A-Za-z0-9]{1,10}$/g); //방법 2. 정규표현식에 일치한 값
    console.log(idOK, pwOK, !!pwOK);

    if (idOK && !!pwOK) {
        res.sendFile(__dirname + '/index.html');
    } else {
        res.send('형식에 맞도록 입력하세요.');
    }
});

app.get('/list', (req, res) => {
    console.log('List requested');
    db.query(`SELECT * FROM Home`, (err, results) => {
        const data = results;
        let list = `<!DOCTYPE html>`;
        list += `<html lang="ko">`;
        list += `    <head>`;
        list += `<meta charset="UTF-8" />`;
        list += `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
        list += `<title>Document</title>`;
        list += `<style>`;
        list += `.head {`;
        list += `text-align: center;`;
        list += `}`;
        list += `.Title{padding-left: 100px;`;
        list += `padding-right: 150px;}`;
        list += `.list {`;
        list += `display: flex;`;
        list += `padding-left: 20px;`;
        list += `padding-right: 20px;`;
        list += `justify-content: space-between;`;
        list += `background-color: rgb(0, 225, 255);`;
        list += `align-items: center;`;
        list += `border-bottom: 5px solid #000;`;
        list += `border-top: 5px solid #F00;`;
        list += `font-weight: bold;`;
        list += `}`;
        list += ` .li{`;
        list += `padding-left: 20px;`;
        list += `padding-right: 20px;`;
        list += `display: flex;`;
        list += `justify-content: space-between;`;
        list += `align-items: center;`;
        list += `font-weight: bold;`;
        list += `}`;
        list += `</style>`;
        list += `    </head>`;
        list += `<body>`;
        list += `    <!-- table>tr>th*5^tr>td*5 -->`;
        list += `   <div class="head"> <h1>게시판</h1> </div>`;
        list += `<button type="button" onclick="location.href='/qurey' ">게시물작성</button>`;
        list += `<button type="button" onclick="location.href='/login' ">로그아웃</button>`;
        list += ` <div class="list">  `;
        list += `            <p>No.</p>`;
        list += `            <p class="Title">제목</p>`;
        list += `            <p>작성자</p>`;
        list += `            <p>작성일</p>`;
        list += `            <p>조회수</p>`;
        list += `   </div></div>   `;
        data.forEach((v) => {
            list += `        <div class="li">`;
            list += `            <p>${v.Num}</p>`;
            list += `            <button type="button" onclick=""><p class="Title">${v.Title}</p></button>`;
            list += `            <p>${v.name}</p>`;
            list += `            <p>${v.Today}</p>`;
            list += `            <p>${v.VIEW_COUNT}</p>`;
            list += `        </div>`;
        });

        list += `    </table>`;
        list += `</body>`;
        list += ``;
        list += `</html>`;
        res.send(list);
    });
});
app.get('/qurey', (req, res) => {
    res.send(
        `<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <style>
            body {
                margin: 0;
                padding: 20px;
                color: #ffffff;
                background-color: rgb(255, 255, 255);
            }
            fieldset {
                border: 3px solid #fff;
                background-color: black;
                font-weight: bold;
            }
            legend {
                border: 2px solid #eee;
                background-color: black;
                padding: 5px 10px;
                border-radius: 5px;
                font-weight: bold 5px;
            }
            input {
                width: calc(100% - 22px);
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #854315;
            }
            button {
                background-color: rgb(70, 2, 2);
                color: #fff;
                font-weight: bold;
                padding: 10px 20px;
            }
            button:hover {
                background-color: rgb(25, 0, 255);
            }
            .memo {
                height: 500px;
            }
        </style>
    </head>
    <body>
        <fieldset>
            <legend>게시글작성</legend>
            <form action="data" id="dataForm">
                <label for="Title">제목</label>
                <input type="text" id="Email" name="Email" /><br />
                <label for="text">내용</label>
                <input type="text" class="memo" /><br />
                <button type="submit">작성하기</button>
                <button type="reset">내용지우기</button>
                <button type="button" onclick="location.href='/list' ">게시판</button>
            </form>
        </fieldset>
    </body>
</html>`
    );
});

app.get('/data', (req, res) => {
    const { Title, name } = req.query;
    db.query(`INSERT INTO Home (Title,name) VALUES (?,?)`, [Title, name], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/');
        console.log(`게시글 : ${Title}, 작성자 : ${name}, 작성일 : ${Today}`);
        console.log('Data inserted successfully');
        return;
    }); //MySQL query here
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
