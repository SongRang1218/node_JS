const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let list = `<!DOCTYPE html>`;
    list += `<html lang="ko">`;
    list += `    <head>`;
    list += `        <meta charset="UTF-8" />`;
    list += `        <meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
    list += `        <title>Document</title>`;
    list += `        <style>`;
    list += `            h1{    text-align: center;}`;
    list += `            table {`;
    list += `                border-collapse: collapse;`;
    list += `                text-align: center;`;
    list += `                width: 70%;`;
    list += `                margin: auto;`;
    list += `                border: 1px solid #000;`;
    list += `               color: #251800;`;
    list += `            }`;
    list += `        td:first-of-type {`;
    list += `            font-weight: bold;`;
    list += `        }`;
    list += `            tr,`;
    list += `            td,`;
    list += `            th {`;
    list += `                border: 1px solid #000;`;
    list += `            font-weight: bold;`;
    list += `            }`;

    list += `            select{margin-left: 78%;`;
    list += `            margin-right: 10px;}`;
    list += `        </style>`;
    list += `    </head>`;
    list += `    <body>`;
    list += `        <table>`;
    list += `    <h1>구구단</h1>`;
    list += `    <form action="/dan">`;
    list += `   <select name="gugu">`;
    for (let k = 2; k <= 9; k++) {
        list += `                <option value="${k}">${k}단</option>`;
    }
    list += `            </select>`;
    list += `    <input type="submit" value="화긴">`;
    list += `    </form><tr><th>수＼단</th>`;
    for (let i = 2; i <= 9; i++) {
        list += `<th>${i}단</th>`;
    }
    list += `            </tr>`;
    for (let j = 1; j < 10; j++) {
        list += `            <tr>`;
        list += `                <td>${j}</td>`;
        for (let i = 2; i <= 9; i++) {
            list += `                <td>${i}X${j}=${i * j}</td>`;
        }
        list += `            </tr>`;
    }
    list += `        </table></body></html>`;
    res.send(list);
});
app.get('/dan', (req, res) => {
    // if('/dan'=`${i}단`){
    // }
    const gugu = req.query.gugu;
    console.log('gugu');
});
app.listen(port, () => {
    console.log(port + '성공적으로 서버를 시작하였습니다.');
});
