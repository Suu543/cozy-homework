# A Vanilla Node.js REST API without Framework

- 공식문서: https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction

Node.js는 매우 인기 있는 JavaScript 런타임 환경입니다. 특히 백엔드 서비스와 API를 구축하는 데 가장 빛을 발합니다. Node.js 개발자들은 종종 Express.js와 같은 오픈 소스 프레임워크와 라이브러리를 활용하여 애플리케이션을 개발합니다. 이러한 라이브러리들은 NPM 레지스트리에서 쉽게 사용할 수 있습니다.

이러한 패키지를 사용할 때, 상당한 수준의 추상화가 존재하며, 이러한 패키지는 내부적으로 원시 Node.js를 처리하고 실행하기 때문에 Node.js의 핵심 기능을 직접 활용하지 않습니다.

주목할 중요한 점은 이러한 패키지들이 Node.js를 인기 있는 기술로 만든다는 것입니다. 반면에 핵심 Node.js를 사용하여 애플리케이션을 개발할 수도 있습니다. 이 방법을 통해 Vanilla Node.js의 기능을 활용할 수 있습니다. 이 블로그에서는 프레임워크 없이 간단한 API를 구축하기 위해 Vanilla Node.js를 사용하는 방법을 가르쳐 드리겠습니다.

## Setting up a Simple HTTP Server

0. 프로젝트 폴더와 app.js 파일을 생성하세요.

1. 첫 번째로 해야 할 일은 Node.js에서 require() 메서드를 사용하여 HTTP 모듈을 가져오는 것입니다. 이 모듈은 Node.js에 기본적으로 내장되어 있습니다. 여분의 패키지나 라이브러리가 필요하지 않으며, 컴퓨터에 Node.js 런타임만 설치되어 있으면 됩니다.

```javascript
const http = require("http");
```

이렇게 하면 서버를 설정하기 위한 필요한 메서드와 함수가 사용 가능해집니다.

2. 사용할 포트를 정의해야 합니다. 아래와 같이 설정하세요.

```javascript
const PORT = process.env.PORT || 5000;
```

3. 서버를 생성하려면 HTTP 모듈에서 createServer 메서드를 호출해야 합니다. 즉, `http.createServer`를 사용합니다. 요청 및 응답을 전달하여 정보를 제공합니다.

그런 다음 다음과 같이 사용합니다.

- `req.url`: 요청 경로/URL을 설정합니다.
- `res.writeHead`: 응답 헤더를 설정합니다.
- `res.write()`: 응답의 실제 내용을 보냅니다.
- `res.end()`: 응답을 종료합니다.
- `req.method`는 HTTP 요청 메서드(HTTP Request Method)를 나타내는 Node.js의 `http.IncomingMessage` 객체의 속성입니다. 이 속성은 클라이언트가 서버로 보낸 HTTP 요청의 메서드를 나타냅니다. HTTP 요청 메서드는 클라이언트가 서버에게 요청의 목적을 알리는 데 사용됩니다.

가장 일반적으로 사용되는 HTTP 요청 메서드에는 다음과 같은 것들이 있습니다:

- `GET`: 서버에서 리소스(데이터)를 가져올 때 사용합니다. 주로 정보를 요청하는데 사용됩니다.
- `POST`: 서버로 데이터를 보낼 때 사용합니다. 주로 데이터를 제출하거나 새로운 데이터를 생성하는 데 사용됩니다.
- `PUT`: 서버에서 리소스를 업데이트하거나 새로운 리소스를 생성할 때 사용합니다. 주로 업데이트를 요청하는 데 사용됩니다.
- `DELETE`: 서버에서 리소스를 삭제할 때 사용합니다. 주로 삭제를 요청하는 데 사용됩니다.
- `PATCH`: 일부 리소스의 업데이트를 요청할 때 사용됩니다. 전체 업데이트가 아닌 부분적인 업데이트를 지정할 때 유용합니다.
- `HEAD`: 서버에서 헤더 정보만을 요청할 때 사용합니다. 실제 데이터를 받지 않고 헤더 정보만 확인할 수 있습니다.

`req.method`를 통해 어떤 종류의 HTTP 요청이 서버로 전송되었는지를 파악할 수 있으므로 이 정보를 기반으로 서버에서 적절한 동작을 수행할 수 있습니다.

```javascript
const server = http.createServer(async (req, res) => {
  // 요청 경로 설정
  if (req.url === "/api" && req.method === "GET") {
    // 응답 헤더 설정
    res.writeHead(200, { "Content-Type": "application/json" });
    // 응답 설정
    res.write("안녕하세요, 이것은 Vanilla Node.js API입니다.");
    // 응답 종료
    res.end();
  }

  // 경로가 없는 경우
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "경로를 찾을 수 없습니다." }));
  }
});
```

4. `listen()` 메서드를 호출하고 PORT 변수를 전달하세요. 그런 다음 서버가 실행 중임을 나타내는 console.log() 메시지를 추가하세요.

```javascript
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 시작되었습니다.`);
});
```

5. 서버가 설정되었습니다. 테스트하려면 `node app.js`를 실행하세요. 이렇게 하면 콘솔 화면에 console.log() 메시지가 기록됩니다.

<img src="https://cdn-images-1.medium.com/max/800/0*bgD49koI_wYZx3EA.jpg" />

6. 브라우저에서 http://localhost:5000/api을 열면 `res.write()`에 정의된대로 응답이 제공됩니다.

<img src="https://cdn-images-1.medium.com/max/800/0*vCkNC-Gp0gmUz64b.jpg" />

## Setting up the REST API

프레임워크없이 Node.js 만을 사용하여 REST API를 설정하는 방법을 살펴보겠습니다. 이를 보여주기 위해 todos 보일러플레이트를 사용하겠습니다.

"Boilerplate(보일러플레이트)"는 소프트웨어 개발에서 일반적으로 사용되는 개념으로, 어떤 유형의 프로젝트를 시작하기 위한 기본적인 구조와 설정을 포함하는 초기 코드 또는 템플릿을 말합니다. 이러한 보일러플레이트는 개발자들이 프로젝트를 빠르게 시작하고 반복적인 작업을 최소화하는 데 도움이 됩니다.

일반적으로 보일러플레이트에는 다음과 같은 내용이 포함될 수 있습니다:

1. **프로젝트 구조 및 폴더 구성**: 프로젝트 파일과 폴더를 정리하고 필요한 디렉토리를 만듭니다.

2. **설정 파일**: 프로젝트에 필요한 환경 설정, 패키지 의존성 및 빌드 도구 구성과 같은 설정 파일을 제공합니다.

3. **기본 코드 예제**: 프로젝트의 핵심 기능을 시작하기 위한 초기 코드 또는 예제 코드를 포함합니다.

4. **라이브러리 및 패키지**: 일반적으로 사용되는 라이브러리나 패키지를 포함하여 프로젝트에 필요한 도구와 라이브러리를 미리 설정합니다.

5. **문서화**: 프로젝트 구조, API 문서, 설명 등의 문서를 포함하여 개발자가 프로젝트를 이해하고 사용할 수 있도록 합니다.

보일러플레이트는 새로운 프로젝트를 시작할 때 초기 설정을 간편하게 할 수 있으며, 개발자 간의 일관된 개발 방법론을 적용하는 데 도움이 됩니다. 보일러플레이트는 웹 개발, 모바일 앱 개발, 데이터 분석, 머신러닝 등 다양한 분야에서 사용됩니다.

```
CRUD_NODE
├── app.js
├── controller.js
├── data.js
└── utils.js
```

1. 테스트 데이터 추가
   data.js: 일시적인 테스트 데이터를 보유합니다. 정보는 todos 배열에 유지됩니다. 각각의 할 일에는 고유한 식별자(id), 할 일 제목, 간단한 설명, 그리고 완료된 할 일을 나타내는 불리언 값이 있습니다.

```javascript
//data.js
/** Todos List*/
const todos = [
  {
    id: 1,
    title: "Coding in Javascript",
    description: "Working with functions in JavaScript",
    completed: false,
  },
  {
    id: 2,
    title: "Cooking Supper",
    description: "Preparing rice and chicken",
    completed: false,
  },
  {
    id: 3,
    title: "Taking a walk",
    description: "Easy time at the park",
    completed: false,
  },
  {
    id: 4,
    title: "Watching Netflix",
    description: "Enjoying the new premiered series",
    completed: false,
  },
];
module.exports = todos;
```

2. 컨트롤러 설정

controllers.js: 이 파일은 이 애플리케이션에서 사용되는 각 경로의 실제 기능과 로직을 관리합니다. Controller 클래스로 구성되어 있으며 다음과 같은 주요 HTTP 메서드가 있습니다:

- `getTodos()`: 일시적인 data.js 파일에 나열된 모든 할 일을 가져와 나열합니다.
- `getTodo()`: 고유한 식별자(id)를 사용하여 단일 할 일을 가져와 나열합니다.
- `createTodo()`: 새로운 일시적인 할 일을 생성합니다.
- `updateTodo()`: 기존 할 일의 값을 업데이트합니다.
- `deleteTodo()`: 목록에서 할 일을 제거합니다.

```javascript
// controller.js
// Logic behind the functionalities
const data = require("./data");

class Controller {
  // getting all todos
  async getTodos() {
    // return all todos
    return new Promise((resolve, _) => resolve(data));
  }

  // getting a single todo
  async getTodo(id) {
    return new Promise((resolve, reject) => {
      // get the todo
      let todo = data.find((todo) => todo.id === parseInt(id));
      if (todo) {
        // return the todo
        resolve(todo);
      } else {
        // return an error
        reject(`Todo with id ${id} not found `);
      }
    });
  }

  // creating a todo
  async createTodo(todo) {
    return new Promise((resolve, _) => {
      // create a todo, with random id and data sent
      let newTodo = {
        id: Math.floor(4 + Math.random() * 10),
        ...todo,
      };

      // return the new created todo
      resolve(newTodo);
    });
  }

  // updating a todo
  async updateTodo(id) {
    return new Promise((resolve, reject) => {
      // get the todo.
      let todo = data.find((todo) => todo.id === parseInt(id));
      // if no todo, return an error
      if (!todo) {
        reject(`No todo with id ${id} found`);
      }
      //else, update it by setting completed to true
      todo["completed"] = true;
      // return the updated todo
      resolve(todo);
    });
  }

  // deleting a todo
  async deleteTodo(id) {
    return new Promise((resolve, reject) => {
      // get the todo
      let todo = data.find((todo) => todo.id === parseInt(id));
      // if no todo, return an error
      if (!todo) {
        reject(`No todo with id ${id} found`);
      }
      // else, return a success message
      resolve(`Todo deleted successfully`);
    });
  }
}
module.exports = Controller;
```

3. 유틸리티 설정

utils.js: 표준 웹 API 사용 사례를 제어합니다. 클라이언트에서 서버로 데이터를 검색하는 getReqData() 함수를 포함하고 있습니다.

```javascript
//utils.js
function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";
      // listen to data sent by client
      req.on("data", (chunk) => {
        // append the string version to the body
        body += chunk.toString();
      });
      // listen till the end
      req.on("end", () => {
        // send back the data
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}
module.exports = { getReqData };
```

4. 서버 및 라우트 설정

app.js: 이 파일에는 다음 내용이 포함되어 있습니다.

- 서버의 초기화 및 구성.
- 서버의 다양한 HTTP 메서드를 수신하는 적절한 라우트.
- 브라우저에서 서버를 활성화하고 듣기 위한 PORT 번호.

라우트는 웹 애플리케이션에서 클라이언트의 요청(requests)에 따라 어떤 동작이나 응답을 수행할 때 사용되는 경로 또는 URL의 일부분을 나타냅니다. 라우트는 클라이언트가 특정 URL에 접근할 때 서버가 어떻게 응답해야 하는지를 정의합니다. 라우트를 설정하면 클라이언트 요청에 대한 적절한 핸들러(처리기) 함수를 호출하거나 컨트롤러를 트리거할 수 있습니다.

일반적으로 라우트는 HTTP 요청 메서드(GET, POST, PUT, DELETE 등)와 함께 사용되며, 특정 URL 경로와 연결됩니다. 예를 들어, "/users" 경로로의 GET 요청은 사용자 목록을 반환하고, "/users/create" 경로로의 POST 요청은 새 사용자를 생성하는 데 사용될 수 있습니다.

라우트를 설정하고 관리하는 것은 웹 애플리케이션의 주요 부분 중 하나이며, 웹 애플리케이션의 동작을 제어하고 사용자에게 응답을 제공하는 핵심 역할을 합니다. 일반적으로 프레임워크 또는 라이브러리를 사용하여 라우트를 관리하며, 이것은 웹 애플리케이션 개발의 중요한 측면 중 하나입니다.

```javascript
//app.js
const http = require("http");
const Todo = require("./controller");
const { getReqData } = require("./utils");

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  // /api/todos : GET
  if (req.url === "/api/todos" && req.method === "GET") {
    // get the todos.
    const todos = await new Todo().getTodos();
    // set the status code, and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    // send the data
    res.end(JSON.stringify(todos));
  }

  // /api/todos/:id : GET
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
    try {
      // get id from url
      const id = req.url.split("/")[3];
      // get todo
      const todo = await new Todo().getTodo(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the data
      res.end(JSON.stringify(todo));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/:id : DELETE
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
    try {
      // get the id from url
      const id = req.url.split("/")[3];
      // delete todo
      let message = await new Todo().deleteTodo(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify({ message }));
    } catch (error) {
      // set the status code and content-type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/:id : UPDATE
  else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
    try {
      // get the id from the url
      const id = req.url.split("/")[3];
      // update todo
      let updated_todo = await new Todo().updateTodo(id);
      // set the status code and content-type
      res.writeHead(200, { "Content-Type": "application/json" });
      // send the message
      res.end(JSON.stringify(updated_todo));
    } catch (error) {
      // set the status code and content type
      res.writeHead(404, { "Content-Type": "application/json" });
      // send the error
      res.end(JSON.stringify({ message: error }));
    }
  }

  // /api/todos/ : POST
  else if (req.url === "/api/todos" && req.method === "POST") {
    // get the data sent along
    let todo_data = await getReqData(req);
    // create the todo
    let todo = await new Todo().createTodo(JSON.parse(todo_data));
    // set the status code and content-type
    res.writeHead(200, { "Content-Type": "application/json" });
    //send the todo
    res.end(JSON.stringify(todo));
  }

  // No route present
  else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
```

5. 애플리케이션 테스트

Vanilla Node.js REST API가 설정되고 모든 것이 작동하는지 확인하기 위해 테스트를 수행할 준비가 되었습니다. 이제 다음 명령을 실행하여 서버를 시작해야 합니다:

```bash
node app.js
```

이 명령은 서버를 5000 포트에서 설정하고 실행합니다.

<img src="https://cdn-images-1.medium.com/max/800/0*bgD49koI_wYZx3EA.jpg" />

## Postman

Postman을 사용하여 API를 탐색해 보겠습니다. API에 설정된 다른 메서드를 테스트합니다. Postman API 테스트를 처음 사용하는 경우, 시작하기 위해 이 튜토리얼을 참조하세요.

---

모든 할 일 가져오기 (Fetch all todos)

`/API/todos GET`: 이것은 data.js에 나열된 모든 할 일을 가져옵니다.

이 GET 요청을 테스트하려면:

Postman으로 이동하여 GET 요청을 보냅니다. 요청 URL은 http://localhost:5000/api/todos로 표시됩니다.

<img src="https://cdn-images-1.medium.com/max/800/0*FMbe1MJRXtA_kNEw.jpg" />

이 작업은 Postman의 응답 섹션에 응답을 기록합니다. 응답에는 data.js에 나열된 모든 할 일이 포함됩니다.

<img src="https://cdn-images-1.medium.com/max/800/0*8VpCuJ7H-c4mE3ve.png" />

---

특정 ID로 할 일 가져오기 (Fetch a todo by id)

`/API/todos/:id GET`: 이것은 할 일의 ID 값을 특정하여 하나의 할 일만 가져옵니다.

이 GET 요청을 테스트하려면:

Postman으로 이동하여 GET 요청을 보냅니다. 요청 URL은 http://localhost:5000/api/todos/:id여야 하며 여기서 :id는 가져 오려는 단일 할 일의 ID입니다.

<img src="https://cdn-images-1.medium.com/max/800/0*MFF8yfIPDwIfzCe4.jpg" />

이 요청은 Postman의 응답 섹션에 단일 할 일을 기록합니다. 요청한 ID에 해당하는 할 일이 응답으로 표시됩니다.

<img src="https://cdn-images-1.medium.com/max/800/0*7ECgakRM9lqlVrZC.png" />

---

할 일 삭제

`/API/todos/:id DELETE:` 이것은 하나의 할 일을 삭제하는 DELETE 요청을 수행합니다. 데이터가 일시적이고 데이터베이스에 저장되지 않기 때문에 응답 메시지만 받게 됩니다.

테스트하려면 다음을 수행하세요:

Postman으로 이동하여 DELETE 요청을 보냅니다. 요청 URL은 http://localhost:5000/api/todos/:id여야 하며 여기서 :id는 삭제하려는 단일 할 일의 ID입니다.

<img src="https://cdn-images-1.medium.com/max/800/0*prp3Rld8xGeHy8el.jpg" />

이 작업은 Postman 응답 콘솔에 "할 일이 성공적으로 삭제되었습니다"라는 메시지를 기록합니다.

<img src="https://cdn-images-1.medium.com/max/800/0*3gSlfsEd4_SUdSVw.png" />

---

할 일 업데이트

`/API/todos/:id PATCH:` 이것은 할 일을 업데이트하여 작업이 완료되었음을 나타내는 true 또는 false 값을 설정합니다. Postman 응답 콘솔에서 효과를 확인할 수 있습니다.

이 작업을 확인하려면:

Postman으로 이동하여 PATCH 요청을 보냅니다. 요청 URL은 http://localhost:5000/api/todos/:id여야 하며 여기서 :id는 업데이트하려는 단일 할 일의 ID입니다.

<img src="https://cdn-images-1.medium.com/max/800/0*975Xeb_XNNs_ZcJ-.jpg" />

Postman 응답 콘솔은 다음과 같아야 합니다:

<img src="https://cdn-images-1.medium.com/max/800/0*M1Q1kTjlMngYergH.png" />

---

새로운 할 일 추가

`/API/todos POST`: 이것은 새로운 할 일 항목을 생성합니다. 새로운 할 일은 응답으로 반환되지만 data.js에 기록되지는 않습니다.

테스트하려면 다음을 수행하세요:

Postman으로 이동하여 새 탭을 열고 POST 요청을 선택한 후 요청 URL을 http://localhost:5000/api/todos로 입력하세요.

<img src="https://cdn-images-1.medium.com/max/800/0*2-cVg2CajjcjkDbB.jpg" />

"Body" 탭 섹션으로 이동하고 "raw"를 선택한 다음 오른쪽의 드롭다운 옵션에서 'JSON'을 선택하세요.

<img src="https://cdn-images-1.medium.com/max/800/0*YGRu3lvlF8dHCPXE.jpg" />

새로운 할 일의 내용 (제목, 설명 및 완료 여부)을 추가하세요. 다음은 간단한 예시입니다:

```json
{
  "title": "새로운 할 일",
  "description": "이것은 새로운 할 일의 설명입니다.",
  "completed": false
}
```

여기서 "title"은 할 일의 제목, "description"은 설명, "completed"는 완료 여부를 나타내는 부울 값입니다. 이 정보를 JSON 형식으로 입력하세요.

<img src="https://cdn-images-1.medium.com/max/800/0*PQJWKl0AmRkg2cZX.jpg" />

위의 세부 정보를 입력한 후 "SEND" 버튼을 클릭하여 POST 요청을 시작하면 새로 추가된 할 일이 Postman 콘솔에 기록됩니다.

| 참고: ID는 무작위로 생성되기 때문에 새로운 POST 요청을 할 때마다 달라질 수 있습니다.

<p style="font-size: 40px;">Happy coding!!!</p>

- https://www.makeuseof.com/nodejs-api-server-without-framework/