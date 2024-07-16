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
    database: 'web2',
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
    db.query(`SELECT * FROM web2`, (err, results) => {
        const data = results;
        let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        list += `    <title>리스트</title>`;
        list += `    <style>`;
        list += `        table {`;
        list += `            border-collapse: collapse;`;
        list += `            text-align: center;`;
        list += `            width: 80%;`;
        list += `            margin: auto;`;
        list += `        }`;
        list += ``;
        list += `        th,`;
        list += `        tr,`;
        list += `        td {`;
        list += `            border: 1px solid #ccc;`;
        list += `        }`;
        list += ``;
        list += `        td {`;
        list += `            width: 20%;`;
        list += `        }`;
        list += ``;
        list += `        h2 {`;
        list += `            text-align: center;`;
        list += `        }`;
        list += ``;
        list += `        th {`;
        list += `            background-color: lightblue;`;
        list += `        }`;
        list += `    </style>`;
        list += `</head>`;
        list += ``;
        list += `<body>`;
        list += `    <!-- table>tr>th*5^tr>td*5 -->`;
        list += `    <h2>데이터베이스 내용</h2>`;
        list += `<button type="button" onclick="location.href='/' ">뒤로가기</button>`;

        list += `    <table>`;
        list += `        <tr>`;
        list += `            <th>No.</th>`;
        list += `            <th>ID</th>`;
        list += `            <th>PW</th>`;
        list += `            <th>이름</th>`;
        list += `            <th>이메일</th>`;
        list += `        </tr>`;

        data.forEach((v) => {
            list += `        <tr>`;
            list += `            <td>${v.NumBer}</td>`;
            list += `            <td>${v.ID}</td>`;
            list += `            <td>${v.PW}</td>`;
            list += `            <td>${v.Name}</td>`;
            list += `            <td>${v.Email}</td>`;
            list += `        </tr>`;
        });

        list += `    </table>`;
        list += `</body>`;
        list += ``;
        list += `</html>`;
        res.send(list);
    });
});

app.get('/data', (req, res) => {
    const { ID, PW, Name, Email } = req.query;
    db.query(`INSERT INTO web2 (ID,PW,Name,Email) VALUES (?,?,?,?)`, [ID, PW, Name, Email], (err, result) => {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect('/');
        console.log(`아이디 : ${ID}, 비밀번호 : ${PW}, 이름 : ${Name}, 이메일 : ${Email}`);
        console.log('Data inserted successfully');
        return;
    }); //MySQL query here
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
