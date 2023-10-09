const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");
const PORT = process.env.PORT | 5000;

const server = http.createServer(async (req, res) => {
  // [GET] /api/todos
  if (req.url === "/api/todos" && req.method === "GET") {
    const todos = await new Todo().getTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todos));
  }

  // [POST] /api/todos
  else if (req.url === "/api/todos" && req.method === "POST") {
    let todo_data = await getReqData(req);
    let todo = await new Todo().createTodo(JSON.parse(todo_data));
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(todo));
  }

  // [GET] /api/todos/:id ==> ["", "api", "todos", ":id"]
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
      const id = req.url.split("/")[3];
      const todo = await new Todo().getTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(todo));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // [DELETE] /api/todos/:id ==> ["", "api", "todos", ":id"]
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
    try {
      const id = req.url.split("/")[3];
      let message = await new Todo().deleteTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(message));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }

  // [UPDATE] /api/todos/:id ==> ["", "api", "todos", ":id"]
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
    try {
      const id = req.url.split("/")[3];
      let updated_todo = await new Todo().updateTodo(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updated_todo));
    } catch (error) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: error }));
    }
  }
});

server.listen(PORT, () => {
  console.log(`서버가 ${PORT}에서 시작되었습니다`);
});
