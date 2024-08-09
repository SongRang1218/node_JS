const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const gugu = req.query.gugu ? parseInt(req.query.gugu) : null;

    let list = `<!DOCTYPE html>`;
    list += `<html lang="ko">`;
    list += `    <head>`;
    list += `        <meta charset="UTF-8" />`;
    list += `        <meta name="viewport" content="width=device-width, initial-scale=1.0" />`;
    list += `        <title>Document</title>`;
    list += `        <style>`;
    list += `            h1 { text-align: center; }`;
    list += `            table {`;
    list += `                border-collapse: collapse;`;
    list += `                text-align: center;`;
    list += `                width: 70%;`;
    list += `                margin: auto;`;
    list += `                border: 1px solid #000;`;
    list += `                color: #251800;`;
    list += `            }`;
    list += `            td:first-of-type {`;
    list += `                font-weight: bold;`;
    list += `            }`;
    list += `            tr, td, th {`;
    list += `                border: 1px solid #000;`;
    list += `                font-weight: bold;`;
    list += `            }`;
    list += `            select {`;
    list += `                margin-left: 78%;`;
    list += `                margin-right: 10px;`;
    list += `            }`;
    list += `            .hidden {`;
    list += `                display: none;`;
    list += `            }`;
    list += `        </style>`;
    list += `    </head>`;
    list += `    <body>`;
    list += `        <h1>구구단</h1>`;
    list += `        <form action="/">`;
    list += `            <select name="gugu">`;
    for (let k = 2; k <= 9; k++) {
        list += `                <option value="${k}" ${gugu === k ? 'selected' : ''}>${k}단</option>`;
    }
    list += `            </select>`;
    list += `            <input type="submit" value="화긴">`;
    list += `        </form>`;
    list += `        <table>`;
    list += `            <tr><th>수＼단</th><th>${gugu}단</th></tr>`;
    for (let j = 1; j < 10; j++) {
        list += `            <tr>`;
        list += `                <td>${j}</td>`;
        if (gugu) {
            list += `                <td>${gugu}X${j}=${gugu * j}</td>`;
        }
        list += `            </tr>`;
    }
    list += `        </table>`;
    list += `    </body>`;
    list += `</html>`;
    res.send(list);
});

app.listen(port, () => {
    console.log(port + '성공적으로 서버를 시작하였습니다.');
});
