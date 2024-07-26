const e = require('express');
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

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
    res.sendFile(__dirname + '/index.html');
    console.log('웹에 정상 접속 하였습니다.');
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
        list += `<button type="button" onclick="location.href='/' ">게시물작성</button>`;
        list += `<button type="button" onclick="location.href='/login' ">로그아웃</button>`;
        list += ` <div class="list">  `;
        list += `            <p>No.</p>`;
        list += `            <p>제목</p>`;
        list += `            <p>작성자</p>`;
        list += `            <p>작성일</p>`;
        list += `            <p>조회수</p>`;
        list += `   </div></div>   `;
        data.forEach((v) => {
            list += `        <div class="li">`;
            list += `            <p>${v.Num}</p>`;
            list += `            <p>${v.Title}</p>`;
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
