var express = require("express");
var session = require("express-session"); // 세션정보는 메모리에 저장함
var app = express();

app.use(
  session({
    secret: "1@%24^%$3^*&98&^%$", // 쿠키에 저장할 connect.sid값을 암호화할 키값 입력
    resave: false, //세션 아이디를 접속할때마다 새롭게 발급하지 않음
    saveUninitialized: true, //세션 아이디를 실제 사용하기전에는 발급하지 않음
  })
);

app.listen(3000, function () {
  console.log("Connected 3000 port");
});

app.get("/session", function (req, res) {
  if (req.session.count) {
    //request에 세션 내용이 있을 경우
    req.session.count++;
  } else {
    //request에 세션 내용이 없을 경우
    req.session.count = 1;
  }
  res.send("count: " + req.session.count);
});
