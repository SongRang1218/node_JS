const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); //모듈 import. Express v4.16.0이상은 생략 가능
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
        res.send(`
            <!DOCTYPE html>
            <html lang="ko">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>로그인 성공</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            color: #333;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
            
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
            
                        h1 {
                            color: #4caf50;
                        }
            
                        p {
                            font-size: 1.2em;
                        }
            
                        strong {
                            color: #3c20bc;
                        }
            
                        button {
                            background-color: rgb(146, 239, 242);
                        }
            
                        button:last-child {
                            background-color: #d8a786;
                        }
                    </style>
                </head>
            
                <body>
                    <div class="container">
                        <h1>성공적으로 로그인 되었습니다.</h1>
                        <p>안녕하세요! <strong>${req.session.username}</strong> 님!</p>
                        <button onclick="location.href='/logout'">나가기</button>
                        <button>회원정보보기</button>
                    </div>
                </body>
            </html>`);
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
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>로그인 페이지</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }

        .login-container {
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            width: 300px;
        }

        .login-container h2 {
            margin-bottom: 20px;
            text-align: center;
        }

        .login-container input {
            width: 94%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 4px;
        }

        .login-container button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: none;
            border-radius: 4px;
            background-color: #007BFF;
            color: white;
            font-size: 16px;
            cursor: pointer;
        }

        .login-container button:hover {
            background-color: #0056b3;
        }

        .login-container .reset-btn {
            background-color: #6c757d;
        }

        .login-container .reset-btn:hover {
            background-color: #5a6268;
        }
    </style>
</head>

<body>
    <div class="login-container">
        <h2>로그인</h2>
        <form action="/" method="POST">
            <label for="username">아이디 : </label>
            <input type="text" id="username" name="username" placeholder="아이디"
                     />
            <label for="pw">비밀번호 : </label>
            <input type="password" id="pw" name="password" placeholder="비밀번호" />
            <button type="submit">Login</button>
            <button type="reset" class="reset-btn">다시 입력</button>
        </form>
    </div>
</body>

</html>`);
});

app.post('/', (req, res) => {
    const { username, password } = req.body; // query 는 get 방식
    const idOK = /^[A-Za-z0-9]{1,8}$/g.test(username); //방법 1. true or false 변환
    const pwOK = password.match(/^[A-Za-z0-9!@#$%&*+-]{1,10}$/g); //방법 2. 정규표현식에 일치한 값
    console.log(idOK, pwOK, !!pwOK);
    if (idOK && !!pwOK) {
        if (username === 'test' && password == '1234') {
            req.session.loggedIn = true;
            req.session.username = username;
            res.redirect('/');
        } else {
            res.send(`<h3>흥 어림없는소리</h3>
            <button onclick="location.href='/'">빠꾸</button>`);
        }
    } else {
        res.send(`<script>alert('입력조건이 맞지 않습니다. 다시 확인해주세요.'); 
            window.location.href='/login';</script>
            `);
    }
});

// Define the /loginC route
app.get('/', (req, res) => {
    if (req.session.loggedIn) {
        res.send(`
            <!DOCTYPE html>
            <html lang="ko">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>로그인 성공</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f0f0f0;
                            color: #333;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 100vh;
                            margin: 0;
                        }
            
                        .container {
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                            text-align: center;
                        }
            
                        h1 {
                            color: #4caf50;
                        }
            
                        p {
                            font-size: 1.2em;
                        }
            
                        strong {
                            color: #3c20bc;
                        }
            
                        button {
                            background-color: rgb(146, 239, 242);
                        }
            
                        button:last-child {
                            background-color: #d8a786;
                        }
                    </style>
                </head>
            
                <body>
                    <div class="container">
                        <h1>성공적으로 로그인 되었습니다.</h1>
                        <p>안녕하세요! <strong>${req.session.username}</strong> 님!</p>
                        <button onclick="location.href='/logout'">나가기</button>
                        <button>회원정보보기</button>
                    </div>
                </body>
            </html>`);
    } else {
        res.redirect('/login');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
