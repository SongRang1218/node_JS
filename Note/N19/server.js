const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // 파일업로드 처리하는 미들웨어

const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.get('/', (req, res) => {
    res.send(`<a href="/list">다운로드 페이지 바로가기</a>`);
});

app.use('/list', express.static(`./Note`));

app.get('/list', (req, res) => {
    res.sendFile(path.join(__dirname, 'Note', 'index.html'));
});

app.get('/files', (req, res) => {
    fs.readdir(path.join(__dirname, 'Note'), 'utf-8', (err, files) => {
        if (err) {
            res.status(500).send('Error reading directory');
            return;
        }
        res.json(files);
    });
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'Note')); // 경로를 같은 폴더에 설정
    },
    filename: (req, file, cb) => {
        let fix = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일명, 한글 깨짐 방지
        cb(null, fix); // 오리지널 네임
    },
});
let upload = multer({ storage }); // multer의 옵션을 오브젝트로 설정

app.post('/up', upload.single('ufile'), (req, res) => {
    console.log(req.file);
    res.redirect('/list');
});

app.listen(port, () => {
    console.log(port + '에서 서버가 시작되었습니다.');
});
