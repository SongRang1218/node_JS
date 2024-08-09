const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer'); // 파일업로드 처리하는 미들웨어
const { Script } = require('vm');

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
    <style>
        body {
            background-color: #121212;
            color: #e0e0e0;
        }
        .accordion-button {
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        .accordion-button:not(.collapsed) {
            color: #e0e0e0;
            background-color: #333;
        }
        .accordion-body {
            background-color: #1e1e1e;
        }
        .list-group-item {
            background-color: #1e1e1e;
            color: #e0e0e0;
            border: 1px solid #333;
        }
        a {
            color: #1e90ff;
            text-decoration: none;
        }
        a:hover {
            color: #63a4ff;
        }
        .input-group {
            margin-top: 20px;
        }
        .btn-outline-primary {
            color: #1e90ff;
            border-color: #1e90ff;
        }
        .btn-outline-primary:hover {
            background-color: #1e90ff;
            color: #fff;
        }
        .modal-content {
            background-color: #1e1e1e;
            color: #e0e0e0;
        }
        .btn-close {
            filter: invert(1);
        }
    </style>

    <script> var MAX_FILE_SIZE = 10 * 1024 * 1024; </script>
    <script>
    function file_onchange(f) {
        if ( f.files[0] != null ) {
            var fileSize = f.files[0].size;
            if (fileSize > MAX_FILE_SIZE ) {
                alert("파일용량은 10MB 이하만 가능합니다.");
                $(f).val('');
    }
        }
    }
</script>
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
            list += `<li class="list-group-item"><a href='/list/${file}' onclick="window.open(this.href, '_blank', 'width=800, height=600'); return false;" class="file-link">${file}</a><a href='/list/${file}' class="file-link" download> - [Download]</a></li>`;
        });

        list += `
                   </div>
                </div>
            </div>
        </div>
    </div>
    <div class="input-group">
        <form action="/up" method="POST" enctype="multipart/form-data" class="input-group mb-3">
            <!-- 업로드 파일 용량체크 -->
            <input type="file" class="form-control" id="inputGroupFile02" name="ufile" onchange="checkSize(this)">
            <!-- 모달창 열기, submit하기 -->
            <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"
                type="submit" id="inputGroupFileAddon04" disabled>파일업로드</button>
        </form>
    </div>
<script>
        const btnActive = () => document.getElementById('inputGroupFileAddon04').disabled = false
        const btnDisable = () => document.getElementById('inputGroupFileAddon04').disabled = true
        function checkSize(input) {
            console.log(input.files[0].name, input.files[0].size)
            if (!!input.files && (input.files[0].size > 10 * 1024 * 1024)) {
                alert('파일 사이즈가 10MB를 넘슴니다.')
                btnDisable()
            } else {
                console.log('파일 사이즈가 적당합니다.')
                btnActive()
            }
        }
    </script>

</script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>

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
