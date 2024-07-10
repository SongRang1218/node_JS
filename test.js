const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
const currentFilePath = __filename;

app.use(logger('tiny'));

app.get('/', (req, res) => {
    res.send('안녕하세요! express로 만든 서버입니다.<h2><a href="/list">리스트목록</a></h2>');
});

app.use('/', express.static(_path));

app.get('/list', (req, res) => {
    fs.readdir(__dirname, 'utf-8', (err, data) => {
        let list = `<h1>링크를 선택하세요</h1><h2><ul>`;
        data.forEach((v) => {
            const nameWithoutExt = path.basename(v, path.extname(v));
            list += `<li><a href='${v}' style='text-decoration-line:none;'>${nameWithoutExt}</a><a href='${v}' style='text-decoration-line:none;' download> - [DownLoad]</a></li>`;
        });
        list += `</ul></h2>`;
        res.send(list);
    });
});

app.get('/save', (req, res) => {
    fs.readFile(currentFilePath, 'utf-8', (err, data) => {
        if (err) {
            res.send('파일을 읽는 중 오류가 발생했습니다.');
            return console.log(err);
        }
        const targetPath = path.join(__dirname, 'backup', path.basename(currentFilePath));
        fs.writeFile(targetPath, data, (err) => {
            if (err) {
                res.send('파일을 저장하는 중 오류가 발생했습니다.');
                return console.log(err);
            }
            res.send('현재 파일의 내용이 성공적으로 저장되었습니다.');
        });
    });
});

app.listen(port, () => {
    console.log('서버를 시작합니다.');
});
