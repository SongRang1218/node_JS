const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    let list = ``;
    list += `    <!DOCTYPE html>`;
    list += `<html lang="ko">`;
    list += `<head>`;
    list += `    <meta charset="UTF-8">`;
    list += `    <meta name="viewport" content="width=device-width, initial-scale=1.0">`;
    list += `    <title>Document</title>`;
    list += `</head>`;
    list += `<style>`;
    list += `    table {`;
    list += `        width: 80%;height: 400px;`;
    list += `        border-collapse: collapse;`;
    list += `    text-align: center;}`;
    list += `    th,`;
    list += `    `;
    list += `    td {`;
    list += `        border: 1px solid #000;width:10%;`;
    list += `        }`;
    list += `</style>`;
    list += `<body><h1>구구단</h1>
            <form action="/">
                <select name="gugu">
                    <option value="0">전체</option>`;
    for (let i = 2; i <= 9; i++) {
        list += `         <option value="${i}">${i}단</option>`;
    }
    list += ` </select><input type="submit" value="확인"></form>`;
    list += `<table><tr>`;

    const gugu = req.query.gugu;
    if (!gugu || gugu == 0) {
        list += `<th></th>`;
        for (let k = 2; k <= 9; k++) {
            list += `<th>${k}단</th>`;
        }
        list += `</tr>`;

        for (let j = 1; j <= 9; j++) {
            list += `<tr><td>${j}</td>`;
            for (let i = 2; i <= 9; i++) {
                list += `<td>${i} x ${j} = ${i * j}</td>`;
            }
            list += `</tr>`;
        }
    } else {
        list += `<th>${gugu}단</th></tr>`;
        for (let i = 2; i <= 9; i++) {
            list += `<td>${gugu} x ${i} = ${gugu * i}</td></tr>`;
        }
    }

    list += `    </table>`;
    list += `</body>`;
    list += `</html>`;
    res.send(list);
});

app.listen(port, () => console.log(`Server running on port ${port}`));
