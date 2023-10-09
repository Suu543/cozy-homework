
// 각 경로의 실제 기능과 로직을 관리한다
// 1. DB에서 미리 저장된 할 일 목록을 받아와한다
// 2. 단일 목록을 받아온다
// 3. 새로운 할 일을 생성하나
// 4. 기존 할 일을 업데이트한다
// 5. 할 일 목록에서 제거한다.
// function getTodos() {}
// function getTodo() {} /api/todos/:id
// function createTodo() {}
// function updateTodo() {}
// function deleteTodo() {}

const data = require("./data.js");

class Controller {
  async getTodos() {
    return new Promise((resolve, _) => resolve(data));
  }

  async getTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (todo) {
        resolve(todo);
      } else {
        reject(`Todo with id: ${id} not found!!!`);
      }
    });
  }

  async createTodo(todo) {
    return new Promise((resolve, _) => {
      let newTodo = {
        id: Math.floor(4 + Math.random() * 10),
        ...todo,
      };

      resolve(newTodo);
    });
  }

  async updateTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (!todo) {
        reject(`Todo with id: ${id} not found!!!`);
      }

      todo["completed"] = true;
      resolve(todo);
    });
  }

  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      let todo = data.find((todo) => todo.id === parseInt(id));
      if (!todo) {
        reject(`Todo with id: ${id} not found!!!`);
      }

      resolve(`Todo deleted successfully`);
    });
  }
}

module.exports = Controller;
