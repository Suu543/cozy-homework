// node.js ===> http
// req(요청) ====== middleware ============ res(응답)
// 1. 요청이 들어온다 (req)
// 2. 사용자 검증 절차를 거친다 (middleware)
// 3. 인증된 사용자 정보를 DB에 저장한다 (middleware)
// 4. 저장했다면 응답으로 저장한 정보를 전달한다 (res)

function validateUser(req, res, next) {
  console.log("사용자 검증 절차");
  req.검증된사용자 = "상호";

  next();
}

function validateAdmin(req, res, next) {
  console.log("사용자 검증 절차");
  req.검증된관리자 = "상호";

  next();
}

const express = require("express");
const app = express();

app.use(validateUser);
app.use(validateAdmin);

// req.method === "GET" && req.url === "/"
app.get("/", (req, res) => {
  console.log(req.검증된사용자);
  res.send("<h1>Homepage</h1>");
});
// app.post();
// app.put();
// app.delete();
// app.patch();

app.listen(3001, () => {
  console.log("3000번 포트를 듣고 있습니다");
});
