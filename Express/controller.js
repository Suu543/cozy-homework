// require: 받아오겠다
const data = require("./data.js");

class Controller {
  constructor() {
    this.count = data.length;
  }

  getTodos() {
    return new Promise((resolve, reject) => {
      if (data) {
        resolve({ data });
      } else {
        reject({ error: "데이터가 없어요" });
      }
    });
  }

  getTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (todo) {
        resolve({
          data: todo,
        });
      } else {
        reject({
          error: "해당 id와 일치하는 항목이 존재하지 않습니다.",
        });
      }
    });
  }

  createTodo(todo) {
    return new Promise((resolve, reject) => {
      this.count = this.count + 1;

      todo = JSON.parse(todo);

      let newTodo = {
        id: this.count,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      };

      data.push(newTodo);
      console.log("data: ", data);
      resolve(data);
    });
  }

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (!todo) {
        reject({
          error: "해당 id가 존재하지 않습니다",
        });
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(id)) {
          data.splice(i, 1);
        }
      }

      resolve(data);
    });
  }

  updateTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (!todo) {
        reject({
          error: "해당 id가 존재하지 않습니다",
        });
      }

      for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(id)) {
          data[i].completed = !data[i].completed;
          break;
        }
      }

      resolve(data);
    });
  }
}

module.exports = Controller;
