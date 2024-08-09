const http = require('http'); // http 모듈 사용

const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    res.end('안녕하세요. nodejs 서버입니다.');
});

server.listen(3000, () => {
    //server.listen(3000,function () => {
    console.log('3000포트에서 서버가 가동됨.');
});
