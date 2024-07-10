const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const app = express();
const port = 3000;
const _path = path.join(__dirname, '/');
app.use(logger('tiny'));
app.use('/', express.static(_path));

app.listen(port, () => {
    console.log('서버를 시작합니다.');
});
