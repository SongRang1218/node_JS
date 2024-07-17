const express = require("express");
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Login route
app.post(
  "/login",
  [
    // ID 유효성 검사
    body("id").isLength({ min: 8 }).withMessage("ID는 8자리 이상이어야 합니다."),
    // 비밀번호 유효성 검사
    body("password")
      .matches(/^[a-zA-Z0-9]+$/)
      .withMessage("비밀번호는 영어와 숫자만 포함해야 합니다."),
  ],
  (req, res) => {
    // 유효성 검사 결과
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id, password } = req.body;

    // 로그인 처리 (여기서는 단순히 성공 메시지만 반환)
    res.status(200).json({ message: "로그인 성공!" });
  }
);

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});
