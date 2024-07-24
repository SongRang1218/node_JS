const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { Script } = require('vm');
const zip = require('express-zip');

const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.use(express.urlencoded({ extended: true }));

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
        .selected {
            background-color: white !important;
            color: black !important;
        }
    </style>
    <script>
        function toggleSelection(checkbox, fileName) {
            const listItem = checkbox.closest('.list-group-item');
            if (checkbox.checked) {
                listItem.classList.add('selected');
            } else {
                listItem.classList.remove('selected');
            }
        }

        function downloadSelectedFiles() {
            const checkboxes = document.querySelectorAll('.file-checkbox:checked');
            const selectedFiles = [];
            checkboxes.forEach((checkbox) => {
                selectedFiles.push(checkbox.value);
            });

            if (selectedFiles.length > 0) {
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = '/download';

                selectedFiles.forEach((file) => {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = 'files';
                    input.value = file;
                    form.appendChild(input);
                });

                document.body.appendChild(form);
                form.submit();
            } else {
                alert('No files selected for download.');
            }
        }
    </script>
</head>
<body>
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
            list += `<li class="list-group-item">
                        <input type="checkbox" class="file-checkbox" value="${file}" onclick="toggleSelection(this, '${file}')">
                        <a href='/list/${file}' onclick="window.open(this.href, '_blank', 'width=800, height=600'); return false;" class="file-link">&emsp;${file}</a>
                        <a href='/list/${file}' class="file-link" download> - [Download]</a>
                    </li>`;
        });

        list += `
                    </div>
                    <button class="btn btn-outline-primary mt-3" onclick="downloadSelectedFiles()">모두 다운로드</button>
                </div>
            </div>
        </div>
    </div>
    <div class="input-group">
        <form action="/up" method="POST" enctype="multipart/form-data" class="input-group mb-3">
            <input type="file" class="form-control" id="inputGroupFile02" name="ufile" onchange="checkSize(this)">
            <button class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" type="submit" id="inputGroupFileAddon04" disabled>파일업로드</button>
        </form>
    </div>
    <script>
        const btnActive = () => document.getElementById('inputGroupFileAddon04').disabled = false
        const btnDisable = () => document.getElementById('inputGroupFileAddon04').disabled = true
        function checkSize(input) {
            console.log(input.files[0].name, input.files[0].size)
            if (!!input.files && (input.files[0].size > 10 * 1024 * 1024)) {
                alert('파일 사이즈가 10MB를 넘습니다.')
                btnDisable()
            } else {
                console.log('파일 사이즈가 적당합니다.')
                btnActive()
            }
        }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`;
        res.send(list);
    });
});

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join('./Note'));
    },
    filename: (req, res, cb) => {
        let fix = Buffer.from(res.originalname, 'latin1').toString('utf8');
        cb(null, fix);
    },
});
let upload = multer({ storage });

app.post('/up', upload.single('ufile'), (req, res) => {
    console.log(req.file);
    res.redirect('/list');
});

app.post('/download', (req, res) => {
    const files = req.body.files;
    if (Array.isArray(files) && files.length > 0) {
        const zip = require('express-zip');
        const filePaths = files.map((file) => ({ path: path.join('./Note', file), name: file }));
        res.zip(filePaths, 'selected_files.zip');
    } else {
        res.status(400).send('No files selected for download.');
    }
});

app.listen(port, () => {
    console.log(port + '에서 서버가 시작되었습니다.');
});
