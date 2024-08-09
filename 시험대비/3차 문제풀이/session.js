const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); //모듈 import. Express v4.16.0이상은 설치 생략 가능
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

app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(__dirname + '/ToDoList.html');
    } else {
        res.send(`
    <style>
            body {
                text-align: center;
                padding-bottom: 10px;
                border: 3px solid #000;
                max-width: 80%;
                min-width: 30%;
                margin: 0 auto; /* 페이지 중앙 정렬 */
                background-color: #f0f8ff; /* 배경색 설정 */
                font-family: Arial, sans-serif; /* 폰트 설정 */
            }

            h2 {
                color: #333;
            }

            input[type='textarea'] {
                padding: 10px;
                width: 80%;
                max-width: 400px;
                margin: 10px auto;
                border: 1px solid #ccc;
                border-radius: 5px;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                display: block;
            }

            button {
                padding: 10px 20px;
                margin: 5px;
                border: none;
                border-radius: 5px;
                background-color: #2ebdff;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #1a8ac9;
            }

            .sdi {
                margin-top: 20px;
                display: flex;
                justify-content: center;
            }

            table {
                border-collapse: collapse;
                margin: 0 auto;
                width: 80%;
                max-width: 600px;
                background-color: #ffffff;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
            }

            tr {
                border-bottom: 1px solid #ddd;
            }

            tr:hover {
                background-color: #2ebdff;
                color: #000;
            }

            td {
                padding: 10px;
                text-align: left;
            }

            .button-style {
                margin-left: 10px;
                padding: 5px 10px;
                background-color: #f44336;
                color: #fff;
                border-radius: 3px;
                border: none;
                cursor: pointer;
                transition: background-color 0.3s;
            }

            .button-style:hover {
                background-color: #d32f2f;
            }

            input[type='checkbox'] {
                margin-right: 10px;
            }
        </style>
    </head>

    <body>
       <button onclick="window.location.href='/login'">로그인</button>
        <hr />
        <h2>할 일 목록</h2>
        <input type="textarea" placeholder="할 일을 입력하세요" />
        <button onclick="alert('로그인이 필요합니다.');window.location.href='/login'">추가하기</button>
        <div class="sdi"><table class="ta"></table></div>
    
    `);
    }
});

app.get('/join', (req, res) => {
    res.sendFile(__dirname + '/join.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/login', (req, res) => {
    const { id, password } = req.body; // query 는 get 방식
    const idOK = /^[A-Za-z0-9]{1,8}$/g.test(id); // 방법1. true or false 반환
    const pwOK = password.match(/^[A-Za-z0-9]{1,8}$/g); // 방법2. 정규표현식에 일치한 값
    console.log(idOK, pwOK, !!pwOK);

    if (idOK && !!pwOK) {
        if (id === 'test' && password == '1234') {
            req.session.loggedIn = true;
            req.session.id = id;
            res.redirect('/');
        } else {
            res.send(`
       <style>
            body {
                text-align: center;
                padding: 20px;
                margin: 0;
                font-family: Arial, sans-serif;
                background-color: #f0f8ff; /* 배경색 설정 */
                color: #333; /* 기본 글자색 */
            }

            h3, h4 {
                margin: 10px 0;
                color: #333;
            }

            button {
                padding: 10px 20px;
                margin: 5px;
                border: none;
                border-radius: 5px;
                background-color: #2ebdff;
                color: #fff;
                font-weight: bold;
                cursor: pointer;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s;
            }

            button:hover {
                background-color: #1a8ac9;
            }
        </style>
    </head>
    <body>
        <h3>정상적인 로그인이 필요합니다.</h3>
        <h4>회원이 아니신 분은 회원가입을 해주세요.</h4>
        <button onclick="location.href='/'">뒤로가기</button>
        <button onclick="location.href='/join'">가입하기</button>
    </body>
        `);
        }
    } else {
        res.send(`<script>
      alert('입력조건이 맞지 않습니다. 다시 작성해 주세요!');
      window.location.href='/login';
      </script>`);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((e) => {
        if (e) console.error(e);
        res.send(`<script>alert('로그아웃이 되었습니다!!');window.location.href='/'</script>`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
