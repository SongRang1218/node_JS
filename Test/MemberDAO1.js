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
    console.log('연동완료');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/memberForm.html');
    console.log('웹에 정상 접속 하였습니다.');
});

app.get('/data', (req, res) => {
    const { id, name, age, email } = req.query;
    db.query('INSERT INTO exam (id, name, age, email) VALUES(?,?,?,?)', [id, name, age * 1, email], (error, result) => {
        //res.redirect('/');
        res.send(`<script>alert('저장되었습니다.');location.href='/'</script>`);
        console.log('저장되었습니다.');
    });
});

app.get('/list', (req, res) => {
    const table = 'exam';
    const que = `SELECT * FROM ${table}`;
    let list = '';
    db.query(que, (error, result) => {
        list += `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <style>
                    table {
                    width: 100%;
                    border-collapse: collapse;
                    }
                    td,
                    tr,
                    th {
                    border: 1px solid black;
                    text-align: center;
                    }
                    th {
                    background-color: aqua;
                    }
                    </style>
                    </head>
                    <body>
                    <button type="button" onclick="location.href='/'">뒤로가기</button>
                    <table>
                    <tr>
                    <th>No.</th>
                    <th>ID</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>이메일</th>
                    </tr>`;
        result.forEach((v) => {
            list += `<tr>
                <td>${v.num}</td>
                <td>${v.id}</td>
                <td>${v.name}</td>
                <td>${v.age}</td>
                <td>${v.email}</td>
            </tr>`;
        });

        list += `</table>
                     </body>
                     </html>`;
        res.send(list);
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
