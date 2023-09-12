// SSD, RAM, HDD (NodeJS) ==> Process ==> Binary Data ==> Stream(이진수) ==> Buffer ==> TCP ==> IP ==> CABLE ==> 목적지로 이동
const http = require("http");
const fs = require("fs");

// 요청: request: req
// 응답: response: res
// www.naver.com/style.css
// www.naver.com/node.png
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // [Head, Body]
    const homepage = fs.readFileSync("./index.html", "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(homepage);
    res.end();
  } else if (req.url === "/style.css") {
    const css = fs.readFileSync("./style.css", "utf8");

    res.writeHead(200, { "Content-Type": "text/css" });
    res.write(css);
    res.end();
  } else if (req.url) {
    const image = fs.readFileSync("./node.png", "utf8");
    res.writeHead(200, { "Content-Type": "image/png" });
    res.write(image);
    res.end();
  }
});

server.listen(3000);
// Process:3000/

// 질문지에 대한 대답을 준비하는 것 ==> 서버

// a.png
// b.png
// jpeg mime-type은?
// c.jpeg
// d.jpeg
// a.css
// b.css
// c.css
// a.js
// b.js
// c.js

// 존재하지 않는 파일 주소에 요청을 했을 때에
// Page Not Found라는 오류를 출력해줘. 404
// 404.html

// 알고리즘: https://school.programmers.co.kr/learn/courses/30/lessons/86491
// Mime-Type: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
