const express = require('express');
const logger = require('morgan');
const app = express();
const port = 3000;

app.use(logger('tiny'));

app.use('/', express.static(__dirname + 'HTML'));
app.use('/', express.static('C:\\workspace\\NODEJS\\nodejs\\HTML'));

app.use('/main', express.static('C:\\workspace\\NODEJS\\nodejs'));
app.use('/main', express.static(__dirname + 'nodejs'));

app.listen(port, () => {
    console.log(`${port}포트에 연결되었습니다.`);
});
