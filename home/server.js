const express = require('express');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
    })
);

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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}.${month}.${day}`;
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
    console.log('웹에 정상 접속 하였습니다.');
});

app.post('/', (req, res) => {
    const { username, password } = req.body;
    const idOK = /^[A-Za-z]{1,8}$/g.test(username);
    const pwOK = password.match(/^[A-Za-z0-9]{1,10}$/g);

    if (idOK && !!pwOK) {
        req.session.username = username; // 세션에 사용자 ID 저장
        res.sendFile(__dirname + '/myp.html');
    } else {
        res.send('형식에 맞도록 입력하세요.');
    }
});

app.post('/data', (req, res) => {
    const { Title, Content } = req.body;
    const name = req.session.username; // 세션에서 사용자 ID 가져오기
    const Today = new Date().toISOString().slice(0, 19).replace('T', ' ');

    db.query(
        `INSERT INTO Home (Title, name, Today, Content) VALUES (?, ?, ?, ?)`,
        [Title, name, Today, Content],
        (err, result) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`게시글: ${Title}, 내용: ${Content}, 작성자: ${name}, 작성일: ${Today}`);
            console.log('Data inserted successfully');
            res.redirect('/list');
        }
    );
});

app.get('/list', (req, res) => {
    db.query(`SELECT * FROM Home`, (err, results) => {
        if (err) {
            console.error(err);
            return;
        }

        let list = `<!DOCTYPE html>`;
        list += `<html lang="ko">`;
        list += `<head>`;
        list += `<meta charset="UTF-8" />`;
        list += `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
        list += `<title>게시판</title>`;
        list += `</head>`;
        list += `<body>`;
        list += `<div><a href="/"><button>로그아웃</button></a></div>`;
        list += `<h1>게시판</h1>`;
        list += `<a href="/qurey"><button>게시물 작성</button></a>`;
        list += `<ul>`;
        results.forEach((v) => {
            list += `<li>`;
            list += `<a href="/post/${v.Num}">${v.Title}</a> - ${v.name} - ${formatDate(v.Today)} - 조회수: ${
                v.VIEW_COUNT
            }`;
            list += `</li>`;
        });
        list += `</ul>`;
        list += `</body>`;
        list += `</html>`;
        res.send(list);
    });
});

app.get('/post/:id', (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM Home WHERE Num = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        if (result.length > 0) {
            const post = result[0];
            let postContent = `<!DOCTYPE html>`;
            postContent += `<html lang="ko">`;
            postContent += `<head>`;
            postContent += `<meta charset="UTF-8" />`;
            postContent += `<meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
            postContent += `<title>${post.Title}</title>`;
            postContent += `</head>`;
            postContent += `<body>`;
            postContent += `<h1>${post.Title}</h1>`;
            postContent += `<p>작성자: ${post.name}</p>`;
            postContent += `<p>작성일: ${formatDate(post.Today)}</p>`;
            postContent += `<p>조회수: ${post.VIEW_COUNT}</p>`;
            postContent += `<div>${post.Content}</div>`;
            postContent += `<a href="/list"><button>목록으로</button></a>`;
            postContent += `</body>`;
            postContent += `</html>`;
            res.send(postContent);
        } else {
            res.send('게시글을 찾을 수 없습니다.');
        }
    });
});

app.get('/qurey', (req, res) => {
    res.send(`<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>게시글 작성</title>
        <style>
            body {
                margin: 0;
                padding: 20px;
                color: #000;
                background-color: rgb(255, 255, 255);
            }
            fieldset {
                border: 3px solid #000;
                background-color: #f0f0f0;
                font-weight: bold;
            }
            legend {
                border: 2px solid #000;
                background-color: #f0f0f0;
                padding: 5px 10px;
                border-radius: 5px;
                font-weight: bold;
            }
            input,
            textarea {
                width: calc(100% - 22px);
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #000;
            }
            button {
                background-color: #333;
                color: #fff;
                font-weight: bold;
                padding: 10px 20px;
            }
            button:hover {
                background-color: #555;
            }
            .memo {
                height: 200px;
            }
        </style>
    </head>
    <body>
        <fieldset>
            <legend>게시글 작성</legend>
            <form action="/data" method="POST" id="dataForm">
                <label for="Title">제목</label>
                <input type="text" id="Title" name="Title" required /><br />
                <label for="Content">내용</label>
                <textarea id="Content" name="Content" class="memo" required></textarea><br />
                <button type="submit">작성하기</button>
                <button type="reset">내용 지우기</button>
                <button type="button" onclick="location.href='/list'">뒤로가기</button>
            </form>
        </fieldset>
    </body>
</html>
`);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
