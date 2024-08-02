const dotenv = require('dotenv');
dotenv.config();
const nid = process.env.nid;
const npw = process.env.npw;

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const request = require('request');
    const query = req.query?.oriurl;
    const url = `https://openapi.naver.com/v1/util/shorturl`;
    const option = {
        url,
        form: { url: query },
        headers: {
            'X-Naver-Client-Id': nid,
            'X-Naver-Client-Secret': npw,
        },
    };
    request.post(option, (err, X, body) => {
        const data = JSON.parse(body);
        console.log(data.result?.url); //-옵셔널체이닝-
        const result = data.result?.url ? data.result.url : '';
        res.send(`<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>URL 단축기</title>
    </head>
    <body>

        <h1>URL 단축기</h1>
        <form action='/'>
        <label for='oriurl'></label>
        <input type="text" id="oriurl" name='oriurl' placeholder="긴 URL을 입력하세요">
        <input type="submit" value="전송">
        </form>
        <a href=${result}>${result}</a>
    </body>
</html>`);
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
