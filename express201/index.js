function validateUser(req, res, next) {
  // 사용자 인증 로직
  res.locals.validated = true;
  res.locals.name = "yongsu";
  res.locals.nickname = "yongyong";

  next();
}

const path = require("path");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.static("files"));

// Template Engine을 설정할 때 사용합니다
app.set("view engine", "ejs");
// 탬플릿 파일이 있는 폴더 지정
app.set("views", path.join(__dirname, "views"));

app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: false }));

app.use(validateUser);

app.get("/", (req, res) => {
  // View Engine을 응답으로 전달할 때 ==>  res.render
  // Convention: 약속/규칙:
  // 1. middleware를 타고 내려온 데이터에 접근하고 싶은경우: res.locals
  // 2. render 함수의 두번째 인자로 전달한 데이터는 locals빼고, 바로 키 값을 접근할 수 있다.

  res.render("index", {
    message: "인덱스 페이지입니다",
    name: "정용수",
    html: `<p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdH6m8uo9xKBhK7z_YqOXo5qwMUDYciOWQqzvtqawG4lcA-2OTf0q6v6nL5yfmUw-Rz2o&usqp=CAU" /></p>`,
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
});

app.post("/test", (req, res) => {
  // req: 요청자 정보
  // req.ip: 요청자의 IP
  // req.path: 요청자의 현재경로
  // req.body: 요청자의 요청과 함께 넘어온 데이터

  // localhost:3000/app.html

  // res.send: text/html
  // res.json: application/json
  // res.raw: <buffer>
  // res.sendFile: 파일

  console.log(req.body);
  res.status(200).json({
    합체: `${req.body.name}는 ${req.body.age} 살 입니다.`,
  });
});

app.post("/user", (req, res) => {
  console.log(req.body.title);
});

app.listen(3000, () => {
  console.log("3000번에서 실행하고 있습니다");
});
