const express = require('express');
const path = require('path');
const logger = require('morgan');
const fs = require('fs');
const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.use(logger('tiny'));

app.get('/', (req, res) => {
    const name = 'save';
    const data = '파일내용이 작성 됨';
    res.send('파일이 저장되었습니다.');
    fs.writeFile(_path + '.txt', data, (e) => {
        if (e) console.log(e); //에러시  에러 내용 출력
        console.log(__dirname + '/save.txt');
        console.log('파일작성이 완료되었습니다.');
    });
});

app.listen(port, () => {
    console.log(`${port}번 포트에서 서버 실행중`);
});
