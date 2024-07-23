const express = require('express');
const logger = require('morgan');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send(`<a href="/list">다운로드 페이지 바로가기</a>`);
});

app.use('/list', express.static(`./Note`));
app.get('/list', (req, res) => {
    fs.readdir(`./Note`, 'utf-8', (err, data) => {
        let list = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Download</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
   
</head>`;
        data.forEach(
            (v) =>
                (list += `<body>
    <div class="accordion" id="accordionExample" >
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Download
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div class="accordion-body">
                <div class="list-group">
                   <li><a href='${v}'style= 'text-decoration-line :none;'>${v}</a><a href='${v}'style= 'text-decoration-line :none;', download> - [DownLoad]</a></li>
                  </div>
            </div>
          </div>
        </div>
        `)
        );

        list += `<input type='file' webkitdirectory />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>
</body>
</html>`;
        res.send(list);
    });
});

app.listen(port, () => {
    console.log(port + '에서 서버가 시작되었습니다.');
});
