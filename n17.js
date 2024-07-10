const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.use(logger('tiny'));
app.use('/', express.static(_path));
app.get('/', (req, res) => {
    res.send('안녕하세요! express로 만든 서버입니다.<h2><a href="/list">리스트목록</a></h2>');
});

// app.get('/data2', (req, res) => {
//     const title = req.query.title;
//     const content = req.query.content;
//     console.log(title, content);
//     fs.writeFile(`${_path}${title}.txt`, content, (e) => {
//         if (e) console.log(e);
//         console.log(`${title}.txt 파일작성이 완료되었습니다.`);
//     });
// });

app.get('/list', (req, res) => {
    fs.readdir(__dirname, 'utf-8', (err, data) => {
        let list = `<h1>링크를 선택하세요</h1><h2><ul>`;
        data.forEach(
            (v) =>
                (list += `<li><a href='${v}'style= 'text-decoration-line :none;'>${v}</a><a href='${v}'style= 'text-decoration-line :none;', download> - [DownLoad]</a></li>`)
        );
        list += `</ul></h2>`;
        res.send(list);
    });
});

app.listen(port, () => {
    console.log('서버를 시작합니다.');
});
