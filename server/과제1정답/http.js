// 1. 필요한 Node.js 모듈들을 불러옵니다.
const http = require("http"); // 웹 서버를 생성하기 위한 http 모듈
const fs = require("fs"); // 파일 시스템 모듈, 파일 읽기/쓰기 등의 작업에 사용
const path = require("path"); // 파일 경로 조작을 위한 path 모듈

// 2. http 모듈을 사용하여 웹 서버를 생성합니다.
const server = http.createServer((req, res) => {
  // 3. 클라이언트의 요청이 "/"인 경우(index 페이지 요청) 처리합니다.
  if (req.url === "/") {
    // 4. index.html 파일을 읽어와서 응답합니다.
    const indexPath = path.join(__dirname, "index.html");
    fs.readFile(indexPath, (err, data) => {
      if (err) {
        // 4-1. 파일 읽기 오류가 발생한 경우 500 에러를 응답합니다.
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      } else {
        // 4-2. 파일을 성공적으로 읽어왔을 경우, 200 OK와 함께 HTML 데이터를 응답합니다.
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      }
    });
  } else {
    // 5. 클라이언트의 요청이 정적 파일인 경우(ex. CSS, JS, 이미지) 처리합니다.
    // 5-1. 요청된 파일의 경로를 만듭니다.
    const filePath = path.join(__dirname, "public", req.url);

    // 5-2. fs 모듈을 사용하여 파일을 읽어옵니다.
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 5-2-1. 파일이 없거나 읽기 오류가 발생한 경우 404 에러를 응답합니다.
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      } else {
        // 5-2-2. 파일을 성공적으로 읽어왔을 경우, 200 OK와 해당 파일의 적절한 Content-Type으로 응답합니다.
        res.writeHead(200, { "Content-Type": getContentType(filePath) });
        res.end(data);
      }
    });
  }
});

// 6. 웹 서버를 구동할 포트 번호를 지정합니다.
const port = 3001;

// 7. 서버를 지정한 포트로 실행하고, 서버가 실행되면 로그를 출력합니다.
server.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

// 8. 파일 확장자에 따라 Content-Type을 반환하는 함수입니다.
function getContentType(filePath) {
  const extname = path.extname(filePath);
  switch (extname) {
    case ".html":
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".png":
      return "image/png";
    case ".jpg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

// 1. 필요한 Node.js 모듈들을 불러옵니다. (http, fs, path)
// 2. http 모듈을 사용하여 웹 서버를 생성합니다. (`http.createServer`)
// 3. 클라이언트의 요청이 "/"인 경우(index 페이지 요청) 처리합니다.
// 4. index.html 파일을 읽어와서 응답합니다. (`fs.readFile`)
//    - 4-1. 파일 읽기 오류가 발생한 경우 500 에러를 응답합니다.
//    - 4-2. 파일을 성공적으로 읽어왔을 경우, 200 OK와 함께 HTML 데이터를 응답합니다.
// 5. 클라이언트의 요청이 정적 파일인 경우(ex. CSS, JS, 이미지) 처리합니다.
//    - 5-1. 요청된 파일의 경로를 만듭니다.
//    - 5-2. fs 모듈을 사용하여 파일을 읽어옵니다.
//      - 5-2-1. 파일이 없거나 읽기 오류가 발생한 경우 404 에러를 응답합니다.
//      - 5-2-2. 파일을 성공적으로 읽어왔을 경우, 200 OK와 해당 파일의 적절한 Content-Type으로 응답합니다.
// 6. 웹 서버를 구동할 포트 번호를 지정합니다.
// 7. 서버를 지정한 포트로 실행하고, 서버가 실행되면 로그를 출력합니다.
// 8. 파일 확장자에 따라 Content-Type을 반환하는 함수입니다. (`getContentType`)
