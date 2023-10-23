function validateUser(req, res, next) {
  // 사용자 인증 로직
  res.locals.validated = true;
  res.locals.name = "yongsu";
  res.locals.nickname = "yongyong";

  next();
}

const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.static("public"));
app.use(express.static("files"));

app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Template Engine을 설정할 때 사용합니다
app.set("view engine", "ejs");
// 탬플릿 파일이 있는 폴더 지정
app.set("views", path.join(__dirname, "views"));

app.use(validateUser);

// wildcard
app.param(":id", (req, res, next, id) => {
  console.log("Param Called: ", id);
  // req.params.id

  next();
});

app.post("/process_login", (req, res) => {
  const { password, username } = req.body;

  if (password == "x") {
    res.cookie("username", username);
    res.redirect("/welcome");
  }
});

// welcome 라우터를, get 메소드를 사용해서 처리하고, 응답으로는 welcome.ejs를 전달해주고, 데이터는 쿠키에서 username을 추출한걸 인자로 전달해줘
app.get("/welcome", (req, res) => {
  // console.log(req.cookies.username);

  res.render("welcome", {
    username: req.cookies.username,
  });
});

// localhost:3000/user/1
// localhost:3000/user/2
// localhost:3000/user/3
// localhost:3000/user/4 ~ 1,000,000,000

app.get("/users/:id", (req, res) => {
  console.log("user/:id - ", req.params.id);

  res.send(`<h1>Id IS ${req.params.id}</h1>`);
});

// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// app.get("/statement", (req, res, next) => {
//   res.json({ msg: "test" });
//   res.send("Hello World");
// });

app.get("/download", (req, res, next) => {
  res.download(
    path.join(__dirname, "images/panda.png"),
    "cozyserver.png",
    (error) => {
      if (error) {
        if (!res.headersSent) {
          res.redirect("/download/error");
        }
      }
    }
  );
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
