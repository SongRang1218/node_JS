const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;
const uploadFolder = './Note';

// Note 폴더가 없으면 생성
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder);
}

// multer 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder);
    },
    filename: (req, file, cb) => {
        let fix = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일명, 한글 깨짐 방지
        cb(null, fix);
    },
});
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 용량 제한
});

// 정적 파일 제공
app.use(express.static(path.join(__dirname, 'N19')));

// 루트 경로로 접근 시 index.html 파일 제공
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 파일 리스트 API
app.get('/list', (req, res) => {
    fs.readdir(uploadFolder, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Error reading directory' });
        }
        res.json(files);
    });
});

// 파일 업로드 엔드포인트
app.post('/up', upload.single('ufile'), (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 시작되었습니다.`);
});
