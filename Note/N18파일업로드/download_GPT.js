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
    fs.readdir(`./Note`, 'utf-8', (err, files) => {
        if (err) {
            res.send('Error reading directory');
            return;
        }

        let list = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    
</head>
<body>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">파일전송완료</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    파일이 정상적으로 전송되었습니다!
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                        onclick="window.location.href='/'">Close</button>
                </div>
            </div>
        </div>
    </div>
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Download
                </button>
            </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                <div class="accordion-body">
                    <div class="list-group">`;

        files.forEach((file) => {
            list += `<li><a href='/list/${file}' class="link-body-emphasis" style='text-decoration-line:none;'>${file}</a><a href='/list/${file}' class="link-body-emphasis" style='text-decoration-line:none;' download> - [DownLoad]</a></li>`;
        });

        list += `
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="input-group">
  <form action="/up" method="POST" enctype="multipart/form-data" class="input-group mb-3">
                        <input type="file" class="form-control" id="inputGroupFile02" name="ufile">
                        <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                            type="submit" id="inputGroupFileAddon04" >파일업로드</button>
                            
                    </form>
</div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`;
        res.send(list);
    });
});
const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join('./Note')); // 경로를 같은 폴더에 설정
    },
    filename: (req, res, cb) => {
        let fix = Buffer.from(res.originalname, 'latin1').toString('utf8'); // 파일명, 한글 깨짐 방지
        cb(null, fix); // 오리지널 네임
    },
});
let upload = multer({ storage }); // multer의 옵션을 오브젝트로 설정

app.post('/up', upload.single('ufile'), (req, res) => {
    console.log(req.file);
});

app.listen(port, () => {
    console.log(port + '에서 서버가 시작되었습니다.');
});
