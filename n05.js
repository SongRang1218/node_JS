const http = require('http'); // http 모듈 사용
const port = 3030;
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/plain; charset=utf-8');
    const jsonData = raquire('./jsondata.json');
    console.log(1, JSON.stringify(jsonData));
    res.end(JSON.stringify(jsonData)); //Object 를 JSON 형태로 변환, JSON 을 Object
});

server.listen(port, () => {
    //server.listen(3000,function () => {
    console.log(`${port} 포트에서 ${port - 30}.서버가 가동됨`);
    //ES6 신 문법백틱을 사용 : 탬플릿문자열, 탬플릿리터럴
});
