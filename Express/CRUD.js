const express = require("express");
const Controller = require("./controller");
const getReqData = require("./utils");
const app = express();

const controller = new Controller();

app.get("/api/todos", (req, res) => {
  controller.getTodos().then((todos) => {
    res.status(200).send(JSON.stringify(todos));
  });
});

app.post("/api/todos", (req, res) => {
  getReqData(req)
    .then((body) => controller.createTodo(body))
    .then((result) => {
      res.status(200).send(JSON.stringify(result));
    });
});

app.get("/api/todos/:id", (req, res) => {
  controller
    .getTodo(req.params.id)
    .then((todo) => {
      res.status(200).send(JSON.stringify(todo));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

app.delete("/api/todos/:id", (req, res) => {
  controller
    .deleteTodo(req.params.id)
    .then((todos) => {
      res.status(200).send(JSON.stringify(todos));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

app.patch("/api/todos/:id", (req, res) => {
  controller
    .patchTodo(req.params.id)
    .then((todos) => {
      res.status(200).send(JSON.stringify(todos));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify(error));
    });
});

app.listen(4000, () => {
  console.log("4000번 포트를 듣고 있습니다");
});
