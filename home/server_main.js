const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(logger());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'pw123456',
        resave: false,
        saveUninitialized: true,
    })
);
const loginRequired = (req, res, next) => {
    if (req.session && req.session.username) {
        next();
    } else {
        res.redirect('/login');
    }
};
const db = mysql.createConnection({
    host: 'localhost',
    user: 'swm',
    port: 3306,
    password: '1234',
    database: 'test_db',
});

db.connect((error) => {
    if (error) {
        console.log('접속 실패');
        return;
    }
    console.log('MySQL Connected!');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const idOK = /^[A-Za-z]{1,8}$/g.test(username);
    const pwOK = password.match(/^[A-Za-z0-9]{1,10}$/g);

    if (username === 'admin' && password == '123456') {
        req.session.username = username;
        req.session.loggedIn = true;
        res.sendFile(__dirname + '/adminPage.html');
    } else if (username === 'test' && password == '1234') {
        req.session.username = username;
        req.session.loggedIn = true;
        res.sendFile(__dirname + '/MyPage.html');
    } else {
        res.send('다시확인해주세요');
    }
});
app.get('/MyPage', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/MyPage.html');
    } else {
        res.sendFile(__dirname + '/login.html');
    }
});

app.get('/content', loginRequired, (req, res) => {
    const username = req.session.username;
    function checkfield() {
        if (Title.text == '') {
            Title.focus();
            exit;
        } else if (content.textarea == '') {
            content.focus();
            exit;
        }
    }

    res.send(`<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게시글 작성</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            color: #fff;
 background-color: #f4f4f4;
        }
        fieldset {
            border: 3px solid #ff4500; /* 주황색 테두리 */
            background-color: #333; /* 검정색 배경 */
            color: #fff; /* 흰색 글씨 */
            padding: 20px;
            margin-bottom: 20px;
        }
        legend {
            border: 2px solid #ff4500; /* 주황색 테두리 */
            background-color: #ff4500; /* 주황색 배경 */
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
            color: #fff; /* 흰색 글씨 */
        }
        .Title, .content, .Name, .Today {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ff4500; /* 주황색 테두리 */
            background-color: #000; /* 검정색 배경 */
            color: #fff; /* 흰색 글씨 */
        }
        button {
            background-color: #ff0000; /* 빨간색 배경 */
            color: #fff; /* 흰색 글씨 */
            font-weight: bold;
            padding: 10px 20px;
            border: none;
            cursor: pointer;
            margin-right: 10px;
        }
        button:hover {
            background-color: #ff4500; /* 주황색 배경 */
        }
    </style>
</head>
<body>
    <fieldset>
        <legend>작성내용</legend>
        <form action="/data" method="post" id="dataForm">
            <label for="Title">게시글제목 </label>
            <input class="Title" type="text" id="Title" name="Title" required /><br />
            <label for="content">게시글내용 </label>
            <textarea class="content" id="content" name="content" rows="6" required></textarea><br />
            <label for="Name">작성자 </label>
            <input class="Name" type="text" id="Name" name="Name" value="${username}" readonly /><br />
            <label for="Today">작성일 </label>
            <input class="Today" id="Today" name="Today" type="text" value="${new Date()
                .toISOString()
                .slice(0, 10)}" readonly /><br />
            <button type="submit" onclick="alert('작성이 완료되었습니다.');">작성</button>
            <button type="reset">내용지우기</button>
            <button type="button" onclick="location.href='/list'">게시판</button>
        </form>
    </fieldset>
</body>
</html>

`);
});

app.post('/data', (req, res) => {
    const { Title, content } = req.body;
    const Name = req.session.username;
    const Today = new Date().toISOString().slice(0, 10);

    // 데이터베이스에 저장하는 로직 추가
    db.query(
        `INSERT INTO home (Title, content, Name, Today, Count) VALUES (?, ?, ?, ?, 0)`,
        [Title, content, Name, Today],
        (err, results) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send('Internal Server Error');
                return;
            }
            res.redirect('/list');
        }
    );
});

app.get('/list', (req, res) => {
    console.log('List requested');
    db.query(`SELECT Num, Title, Name, Today, Count FROM home`, (err, results) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        const data = results;
        let list = `<!DOCTYPE html><html lang="ko"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">`;
        list += `    <title>리스트</title>`;
        list += `    <style>`;
        list += `        body {`;
        list += `            font-family: Arial, sans-serif;`;
        list += `            background-color: #f4f4f4;`;
        list += `            margin: 0;`;
        list += `            padding: 0;`;
        list += `        }`;
        list += `        .container {`;
        list += `            max-width: 1000px;`;
        list += `            margin: auto;`;
        list += `            padding: 20px;`;
        list += `        }`;
        list += `        h1 {`;
        list += `            text-align: center;`;
        list += `            font-weight: bold;`;
        list += `            color: #333;`;
        list += `            margin-bottom: 20px;`;
        list += `        }`;
        list += `        .button-container {`;
        list += `            text-align: right;`;
        list += `            margin-bottom: 20px;`;
        list += `        }`;
        list += `        button {`;
        list += `            background-color: #333;`;
        list += `            color: #fff;`;
        list += `            font-weight: bold;`;
        list += `            padding: 10px 20px;`;
        list += `            border: none;`;
        list += `            cursor: pointer;`;
        list += `            margin-left: 10px;`;
        list += `        }`;
        list += `        button:hover {`;
        list += `            background-color: #e74c3c;`;
        list += `        }`;
        list += `        table {`;
        list += `            border-collapse: collapse;`;
        list += `            width: 100%;`;
        list += `            background-color: #fff;`;
        list += `            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);`;
        list += `        }`;
        list += `        th, td {`;
        list += `            border: 1px solid #ccc;`;
        list += `            padding: 12px;`;
        list += `            text-align: center;`;
        list += `        }`;
        list += `        th {`;
        list += `            background-color: #f39c12;`;
        list += `            color: #fff;`;
        list += `        }`;
        list += `        tr:nth-child(even) {`;
        list += `            background-color: #f2f2f2;`;
        list += `        }`;
        list += `        tr:hover {`;
        list += `            background-color: #f39c12;`;
        list += `            color: #fff;`;
        list += `        }`;
        list += `        a {`;
        list += `            color: inherit;`;
        list += `            text-decoration: none;`;
        list += `        }`;
        list += `    </style>`;
        list += `</head>`;
        list += `<body>`;
        list += `    <div class="container">`;
        list += `        <h1>게시판</h1>`;
        if (req.session && req.session.username == 'admin') {
            list += `                <h1>관리자 권한입니다</h1>`;
        }
        list += `        <div class="button-container">`;
        // 로그인 상태에 따라 버튼 표시
        if (req.session && req.session.loggedIn) {
            list += `            <button type="button" onclick="location.href='/'">로그아웃</button>`;
            list += `            <button type="button" onclick="location.href='/MyPage'">마이페이지</button>`;
            list += `            <button class="btn1" type="button" onclick="location.href='/content'">게시글작성</button>`;
            if (req.session && req.session.username == 'admin') {
                list += `            <button type="button" class="del" onclick="confirmDelete()">삭제</button>`;
            }
        } else {
            list += `            <button type="button" onclick="location.href='/login'">로그인</button>`;
            list += `            <button class="btn1" type="button" onclick="alert('로그인이 필요합니다');">게시글작성</button>`;
        }
        list += `        </div>`;
        list += `        <table>`;
        list += `            <tr>`;
        if (req.session && req.session.username == 'admin') {
            list += `                <th></th>`;
        }
        list += `                <th>No.</th>`;
        list += `                <th>게시글</th>`;
        list += `                <th>작성자</th>`;
        list += `                <th>작성일</th>`;
        list += `                <th>조회수</th>`;
        list += `            </tr>`;
        data.forEach((v) => {
            const date = new Date(v.Today);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;
            list += `            <tr>`;
            if (req.session && req.session.username == 'admin') {
                list += `                <td><input type="checkbox" class="check" value="${v.Num}"></td>`;
            }
            list += `                <td>${v.Num}</td>`;
            list += `                <td><a href="/query?num=${v.Num}">${v.Title}</a></td>`;
            list += `                <td>${v.Name}</td>`;
            list += `                <td>${formattedDate}</td>`;
            list += `                <td>${v.Count}</td>`;
            list += `            </tr>`;
        });
        list += `        </table>`;
        list += `    </div>`;
        list += `    <script>`;
        list += `        function confirmDelete() {`;
        list += `            const checkboxes = document.querySelectorAll('.check:checked');`;
        list += `            if (checkboxes.length === 0) {`;
        list += `                alert('삭제할 항목을 선택해주세요.');`;
        list += `                return;`;
        list += `            }`;
        list += `            if (confirm('정말 삭제하시겠습니까?')) {`;
        list += `                const ids = Array.from(checkboxes).map(checkbox => checkbox.value);`;
        list += `                fetch('/delete-posts', {`;
        list += `                    method: 'POST',`;
        list += `                    headers: { 'Content-Type': 'application/json' },`;
        list += `                    body: JSON.stringify({ ids })`;
        list += `                })`;
        list += `                .then(response => {`;
        list += `                    if (response.ok) {`;
        list += `                        alert('삭제 성공');`;
        list += `                        location.reload();`;
        list += `                    } else {`;
        list += `                        alert('삭제 실패');`;
        list += `                    }`;
        list += `                })`;
        list += `                .catch(error => {`;
        list += `                    alert('삭제 실패');`;
        list += `                    console.error('Error:', error);`;
        list += `                });`;
        list += `            }`;
        list += `        }`;
        list += `    </script>`;
        list += `</body>`;
        list += `</html>`;
        res.send(list);
    });
});

app.post('/delete-posts', (req, res) => {
    if (!req.session || !req.session.loggedIn || req.session.username !== 'admin') {
        return res.status(403).send('권한이 없습니다.');
    }

    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).send('삭제할 항목이 없습니다.');
    }

    const placeholders = ids.map(() => '?').join(',');
    db.query(`DELETE FROM home WHERE Num IN (${placeholders})`, ids, (err, results) => {
        if (err) {
            console.error('Error executing query', err);
            return res.status(500).send('Internal Server Error');
        }
        res.status(200).send('삭제 성공');
    });
});

app.get('/query', (req, res) => {
    const num = req.query.num;

    db.query(`UPDATE home SET Count = Count + 1 WHERE Num = ?`, [num], (err, results) => {
        if (err) {
            console.error('Error updating view count', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        db.query(`SELECT * FROM home WHERE Num = ?`, [num], (err, results) => {
            if (err) {
                console.error('Error executing query', err);
                res.status(500).send('Internal Server Error');
                return;
            }

            if (results.length === 0) {
                res.status(404).send('게시글을 찾을 수 없습니다.');
                return;
            }

            const data = results[0];
            const date = new Date(data.Today);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const formattedDate = `${year}-${month}-${day}`;

            let query = `<!DOCTYPE html>`;
            query += `<html lang="ko">`;
            query += `<head>`;
            query += `    <meta charset="UTF-8">`;
            query += `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
            query += `    <title>게시글 상세</title>`;
            query += `    <style>`;
            query += `        body {`;
            query += `            font-family: Arial, sans-serif;`;
            query += `            margin: 0;`;
            query += `            padding: 20px;`;
            query += `            background-color: #f9f9f9;`;
            query += `        }`;
            query += `        .container {`;
            query += `            max-width: 800px;`;
            query += `            margin: auto;`;
            query += `            background-color: #fff;`;
            query += `            padding: 20px;`;
            query += `            border: 1px solid #ddd;`;
            query += `            border-radius: 5px;`;
            query += `            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);`;
            query += `        }`;
            query += `        h2 {`;
            query += `            color: #333;`;
            query += `            border-bottom: 2px solid #f39c12;`;
            query += `            padding-bottom: 10px;`;
            query += `        }`;
            query += `        .content {`;
            query += `            margin: 20px 0;`;
            query += `            line-height: 1.6;`;
            query += `            color: #333;`;
            query += `        }`;
            query += `        .meta {`;
            query += `            margin: 10px 0;`;
            query += `            color: #777;`;
            query += `        }`;
            query += `        .meta span {`;
            query += `            margin-right: 10px;`;
            query += `        }`;
            query += `        .meta .name {`;
            query += `            color: #e74c3c;`;
            query += `        }`;
            query += `        .meta .date {`;
            query += `            color: #f39c12;`;
            query += `        }`;
            query += `        .meta .count {`;
            query += `            color: #d35400;`;
            query += `        }`;
            query += `    </style>`;
            query += `</head>`;
            query += `<body>`;
            query += `    <div class="container">`;
            query += `<button type="button" onclick="window.location.href='/list'">목록으로</button>`;
            query += `        <h2>${data.Title}</h2>`;
            query += `        <div class="content">${data.content}</div>`;
            query += `        <div class="meta">`;
            query += `            <span class="name">작성자: ${data.Name}</span>`;
            query += `            <span class="date">작성일: ${formattedDate}</span>`;
            query += `            <span class="count">조회수: ${data.Count}</span>`;
            query += `        </div>`;
            query += `    </div>`;
            query += `</body>`;
            query += `</html>`;
            res.send(query);
        });
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
