const http = require("http");
const Controller = require("./controller");
const getReqData = require("./utils");
const PORT = 5000;

// localhost:5000/api/todos
const controller = new Controller();

const server = http.createServer((req, res) => {
  if (req.url === "/api/todos" && req.method === "GET") {
    controller.getTodos().then((todos) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    });
  } else if (req.url === "/api/todos" && req.method === "POST") {
    getReqData(req)
      .then((body) => controller.createTodo(body))
      .then((result) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(result));
        res.end();
      });
  } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    // "/api/todos/3".split("/") = ["", "api", "todos", 3]
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
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "ROUTE NOT FOUND" }));
  }
});

server.listen(PORT, () => {
  console.log("5000번 방을 사용하고 있습니다.");
});
