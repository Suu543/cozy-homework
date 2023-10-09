const http = require("http");
const Controller = require("./controller");
// const getReqData = require("./utils");
const PORT = 5000;

// localhost:5000/api/todos
const controller = new Controller();

const server = http.createServer((req, res) => {
  if (req.url === "/api/todos" && req.method === "GET") {
    const todos = controller.getTodos();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(todos));
    res.end();
  } else if (req.url === "/api/todos" && req.method === "POST") {
    // let reqData = getReqData(req);
    // let todo = controller.createTodo(reqData);
    // res.writeHead(200, { "Content-Type": "application/json" });
    // res.write(JSON.stringify(todo));
    // res.end();
  } else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    // "/api/todos/3".split("/") = ["", "api", "todos", 3]
    const id = req.url.split("/")[3];
    const todo = controller.getTodo(id);

    if (todo.data) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todo));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todo));
      res.end();
    }
  } else if (
    req.url.match(/\/api\/todos\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    const todos = controller.deleteTodo(id);

    if (!todos.error) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    }
  } else if (
    req.url.match(/\/api\/todos\/([0-9]+)/) &&
    req.method === "PATCH"
  ) {
    const id = req.url.split("/")[3];
    const todos = controller.updateTodo(id);

    if (!todos.error) {
      res.writeHead(300, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify(todos));
      res.end();
    }
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "ROUTE NOT FOUND" }));
  }
});

server.listen(PORT, () => {
  console.log("5000번 방을 사용하고 있습니다.");
});

function getOne() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 100000; i++) {
      console.log(i);
    }

    resolve("getOne");
  });
}

function getTwo(a) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 100000; i++) {
      console.log(i);
    }

    console.log(a);

    resolve(a);
  });
}

function getThree(b) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < 100000; i++) {
      console.log(i);
    }

    console.log(b);

    reject("오류");
    resolve("getThree");
  });
}

function a() {
  getOne()
    .then((a) => getTwo(a))
    .then((b) => getThree(b))
    .then(() => console.log(c))
    .catch((error) => console.log(errro));
}

async function run() {
  // await = then, catch?
  try {
    let 로그인정보 = await getOne();
    let 저장소정보 = await getTwo();
    let 커밋메세지 = await getThree();

    console.log(`${저장소정보}에 ${로그인정보} 사람이 ${커밋메세지} 보낸다`);
  } catch (error) {
    console.log("Error: ", error);
  }
}

console.log("heelo")

getUser(1)
  .then((user) => getRepositories(user.gitHubUsername))
  .then((repos) => getCommits(repos[0]))
  .then((commits) => console.log("Commits", commits))
    .catch((err) => console.log("Error", err.message));
  
console.log("world");
