// data.js 파일을 가져옵니다.
const data = require("./data.js");

// Controller 클래스를 정의합니다.
class Controller {
  constructor() {
    // 생성자에서 데이터 배열의 길이를 초기화합니다.
    this.count = data.length;
  }

  // 모든 todo 항목을 반환하는 메소드입니다.
  getTodos() {
    return new Promise((resolve, reject) => {
      if (data) {
        // 데이터가 있으면 데이터를 반환합니다.
        resolve({ data });
      } else {
        // 데이터가 없으면 에러를 반환합니다.
        reject({ error: "데이터가 없어요" });
      }
    });
  }

  // 특정 id에 해당하는 todo 항목을 반환하는 메소드입니다.
  getTodo(id) {
    return new Promise((resolve, reject) => {
      // id를 사용하여 데이터 배열에서 해당 항목을 찾습니다.
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (todo) {
        // 해당 항목이 있으면 해당 항목을 반환합니다.
        resolve({
          data: todo,
        });
      } else {
        // 해당 id와 일치하는 항목이 없으면 에러를 반환합니다.
        reject({
          error: "해당 id와 일치하는 항목이 존재하지 않습니다.",
        });
      }
    });
  }

  // 새로운 todo 항목을 생성하는 메소드입니다.
  createTodo(todo) {
    return new Promise((resolve, reject) => {
      // 항목을 추가할 때마다 count 값을 증가시킵니다.
      this.count = this.count + 1;

      // 전달받은 todo를 JSON 형태로 파싱합니다.
      todo = JSON.parse(todo);

      // 새로운 todo 항목을 생성합니다.
      let newTodo = {
        id: this.count,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
      };

      // 데이터 배열에 새로운 항목을 추가합니다.
      data.push(newTodo);

      // 변경된 데이터 배열을 반환합니다.
      resolve(data);
    });
  }

  // 특정 id에 해당하는 todo 항목을 삭제하는 메소드입니다.
  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      // id를 사용하여 데이터 배열에서 해당 항목을 찾습니다.
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (!todo) {
        // 해당 id에 해당하는 항목이 없으면 에러를 반환합니다.
        reject({
          error: "해당 id가 존재하지 않습니다",
        });
      }

      // 데이터 배열에서 해당 항목을 삭제합니다.
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(id)) {
          data.splice(i, 1);
        }
      }

      // 변경된 데이터 배열을 반환합니다.
      resolve(data);
    });
  }

  // 특정 id에 해당하는 todo 항목의 completed 상태를 업데이트하는 메소드입니다.
  updateTodo(id) {
    return new Promise((resolve, reject) => {
      // id를 사용하여 데이터 배열에서 해당 항목을 찾습니다.
      let todo = data.find((todo) => todo.id === parseInt(id));

      if (!todo) {
        // 해당 id에 해당하는 항목이 없으면 에러를 반환합니다.
        reject({
          error: "해당 id가 존재하지 않습니다",
        });
      }

      // 해당 항목의 completed 상태를 토글합니다.
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === parseInt(id)) {
          data[i].completed = !data[i].completed;
          break;
        }
      }

      // 변경된 데이터 배열을 반환합니다.
      resolve(data);
    });
  }
}

// Controller 클래스를 모듈로 내보냅니다.
module.exports = Controller;
