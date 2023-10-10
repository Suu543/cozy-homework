// 필요한 모듈들을 가져옵니다.
const http = require("http"); // Node.js의 http 모듈
const Controller = require("./controller"); // 컨트롤러 모듈
const getReqData = require("./utils"); // 유틸리티 모듈
const PORT = 5000; // 서버 포트 설정

// 컨트롤러 인스턴스를 생성합니다.
const controller = new Controller();

// HTTP 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // 요청(request)에 따라 다른 동작을 수행합니다.

  // GET 메소드로 "/api/todos" 경로로 요청이 들어오면
  if (req.url === "/api/todos" && req.method === "GET") {
    // 컨트롤러의 getTodos 메소드를 호출하고 반환된 데이터를 JSON 형태로 응답합니다.
    controller.getTodos().then((todos) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    });
  } else if (req.url === "/api/todos" && req.method === "POST") {
    // POST 메소드로 "/api/todos" 경로로 요청이 들어오면
    // 요청 본문(body) 데이터를 읽어와서 컨트롤러의 createTodo 메소드를 호출하고 반환된 결과를 JSON 형태로 응답합니다.
    getReqData(req)
      .then((body) => controller.createTodo(body))
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      });
  } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    // GET 메소드로 "/api/todos/{숫자}" 경로로 요청이 들어오면
    // 경로에서 숫자(id)를 추출하여 해당 id에 대한 todo 정보를 가져와 응답합니다.
    const id = req.url.split("/")[3];
    controller
      .getTodo(id)
      .then((todo) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(todo));
        res.end();
      })
      .catch((error) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify(error));
        res.end();
      });
  } else if (
    req.url.match(/\/api\/todos\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    // DELETE 메소드로 "/api/todos/{숫자}" 경로로 요청이 들어오면
    // 경로에서 숫자(id)를 추출하여 해당 id에 대한 todo를 삭제하고 결과를 응답합니다.
    const id = req.url.split("/")[3];
    controller
      .deleteTodo(id)
      .then((todos) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(todos));
        res.end();
      })
      .catch((error) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify(error));
        res.end();
      });
  } else if (
    req.url.match(/\/api\/todos\/([0-9]+)/) &&
    req.method === "PATCH"
  ) {
    // PATCH 메소드로 "/api/todos/{숫자}" 경로로 요청이 들어오면
    // 경로에서 숫자(id)를 추출하여 해당 id에 대한 todo를 업데이트하고 결과를 응답합니다.
    const id = req.url.split("/")[3];
    controller
      .patchTodo(id)
      .then((todos) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(todos));
        res.end();
      })
      .catch((error) => {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify(error));
        res.end();
      });
  } else {
    // 그 외의 모든 경우에는 404 오류 응답을 반환합니다.
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "ROUTE NOT FOUND" }));
  }
});

// 서버를 지정한 포트로 시작합니다.
server.listen(PORT, () => {
  console.log("5000번 포트를 사용하고 있습니다.");
});
