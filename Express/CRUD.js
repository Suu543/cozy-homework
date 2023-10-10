// Express 프레임워크를 가져옵니다.
const express = require("express");

// 컨트롤러 모듈을 가져옵니다.
const Controller = require("./controller");

// 유틸리티 함수를 가져옵니다.
const getReqData = require("./utils");

// Express 애플리케이션을 생성합니다.
const app = express();

// 컨트롤러 인스턴스를 생성합니다.
const controller = new Controller();

// GET 요청에 대한 처리를 정의합니다.
app.get("/api/todos", (req, res) => {
  // 컨트롤러의 getTodos 메소드를 호출하고 반환된 데이터를 응답합니다.
  controller.getTodos().then((todos) => {
    res.status(200).send(JSON.stringify(todos));
  });
});

// POST 요청에 대한 처리를 정의합니다.
app.post("/api/todos", (req, res) => {
  // 클라이언트로부터의 요청 데이터를 읽어오고, 그 데이터를 이용하여 새로운 todo 항목을 생성합니다.
  getReqData(req)
    .then((body) => controller.createTodo(body))
    .then((result) => {
      res.status(200).send(JSON.stringify(result));
    });
});

// GET 요청에 대한 처리를 정의합니다. :id는 동적인 경로 파라미터로 사용됩니다.
app.get("/api/todos/:id", (req, res) => {
  // 경로 파라미터로부터 id를 추출하고, 해당 id에 대한 todo 항목을 반환합니다.
  controller
    .getTodo(req.params.id)
    .then((todo) => {
      res.status(200).send(JSON.stringify(todo));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

// DELETE 요청에 대한 처리를 정의합니다. :id는 동적인 경로 파라미터로 사용됩니다.
app.delete("/api/todos/:id", (req, res) => {
  // 경로 파라미터로부터 id를 추출하고, 해당 id에 대한 todo 항목을 삭제하고 결과를 반환합니다.
  controller
    .deleteTodo(req.params.id)
    .then((todos) => {
      res.status(200).send(JSON.stringify(todos));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

// PATCH 요청에 대한 처리를 정의합니다. :id는 동적인 경로 파라미터로 사용됩니다.
app.patch("/api/todos/:id", (req, res) => {
  // 경로 파라미터로부터 id를 추출하고, 해당 id에 대한 todo 항목의 상태를 업데이트하고 결과를 반환합니다.
  controller
    .patchTodo(req.params.id)
    .then((todos) => {
      res.status(200).send(JSON.stringify(todos));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

// 4000번 포트에서 서버를 시작합니다.
app.listen(4000, () => {
  console.log("4000번 포트를 듣고 있습니다");
});

// 위 코드는 Express 프레임워크를 사용하여 RESTful API를 구현한 것으로, GET, POST, DELETE, PATCH 요청에 대한 처리를 정의하고 4000번 포트에서 서버를 실행합니다.
// 각 요청에 따라 컨트롤러에서 데이터를 처리하고 클라이언트에 응답합니다.
