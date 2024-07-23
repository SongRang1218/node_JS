const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser'); //모듈 import. Express v4.16.0이상은 생략 가능
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/login.html');
});

app.post('/', (req, res) => {
    const { username, password } = req.body; // query 는 get 방식
    const idOK = /^[A-Za-z]{1,7}$/g.test(username); //방법 1. true or false 변환
    const pwOK = password.match(/^[A-Za-z0-9]{1,9}$/g); //방법 2. 정규표현식에 일치한 값
    console.log(idOK, pwOK, !!pwOK);

    if (username == 'admin' && password == '123456') {
        res.send(` <!DOCTYPE html>
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
                    <h1>관리자로 로그인 하셨습니다.</h1>
                    <button>회원관리</button>
                    <button>회원삭제</button>
                </div>
            </body>
        </html>`);
    } else if (idOK && pwOK) {
        res.send(`로그인하셨습니다.`);
    } else {
        res.send('형식에 맞도록 입력하세요.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
