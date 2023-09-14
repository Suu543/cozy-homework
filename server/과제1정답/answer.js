// Network => TCP => Internet Protocol ==> Application (HTTP, FTP, WebSocket)
// Nodejs HTTP?
// 1. HTTP 규격? ==> Server ==> 1. HTTP Request ==>
// WHAT? 구글 홈페이지
// WHO? 구글 서버
// WHEN? 요청 시간
// HOW? HTTP
// 2. Socket (TCP Interface)
// HTTP Response = Server
const http = require("http");
const fs = require("fs");
const path = require("path");
// 어떤 요청이 들어온지 알아야, 어떤 응답을 해줄지 결정할 수 있다.
// 요청에대한정보: request: req, 응답에 대한 정보: response: res
// 요청에 대한 정보는 사용자 혹은 브라우저가 만드는 것, 서버는 그저 받은 걸 읽고 해석할 뿐
// 응답에 대한 정보는 서버가 사용자의 요청을 해석해서 알맞게 보내주는 거.
// 요청 => What? URL(Domain) + HTTP(S) ==> https://www.google.com
// L2 Switch ==> Router ==> Internet ==> Router ==> L2 Switch ==> Server

// 1. 어떤 URL로 요청이 들어왔는지 해석해야한다?
// 어떤 질문을 했는지 알아야, 알맞은 대답을 할 수 있기 때문이다.
// 2. URL ==> PORT ==> 서버를 호텔 ==> 입구 "/" ==> 101, 201, 301, 401

// HTTP
// Header: Status Code(상태코드 200 ok), Content-Type
// Body: Data
// const server = http.createServer((req, res) => {
//   // localhost:3000
//   if (req.url == "/") {
//     const homepage = fs.readFileSync("./index.html", "utf-8");

//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.write(homepage);
//     res.end();
//   } else if (req.url == "./style.css") {
//     const css = fs.readFileSync("./style.css", "utf-8");

//     res.writeHead(200, { "Content-Type": "text/css" });
//     res.write(css);
//     res.end();
//   } else if (req.url == "./node.png") {
//     const image = fs.readFileSync("./node.png", "utf-8");

//     res.writeHead(200, { "Content-Type": "image/png" });
//     res.write(image);
//     res.end();
//   }
// });

const server = http.createServer((req, res) => {
  // localhost:3000
  if (req.url == "/") {
    const homepage = fs.readFileSync("./index.html", "utf-8");

    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(homepage);
    res.end();
  } else {
    const filePath = path.join(__dirname, "public", req.url);
    console.log("filePath: ", filePath);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      } else {
        res.writeHead(200, { "Content-Type": getContentType(filePath) });
        res.end(data);
      }
    });
  }
});

server.listen(3000, () => {
  console.log("server is running");
});

// 용수 컴퓨터 ==> 프로세스(고유한 주소 값) (IP(NIC) + PORT)

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
