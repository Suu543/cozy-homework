const http = require("http");
const PORT = 3000;

const server = http.createServer((req, res) => {
  console.log("req: ", req);

  // 요청 경로 설정
  if (req.url === "/api" && req.method === "GET") {
    // 응답 헤더 설정
    res.writeHead(200, { "Content-Type": "application/json" });
    // 응답 내용 설정
    res.write("안녕하세요 반갑습니다!");
    // 응답 종료
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end("PAGE NOT FOUND");
  }
});

// listen은 인자 값으로 받은 PORT에 서버를 설치하겠다.
server.listen(PORT, () => {
  console.log("3000번 방에서 서버가 실행됩니다");
});

// 서버
// request: HTTPIncomingMessage
// request = {
//  라우터 + 컨트롤러 or 핸들러(함수)
//  req.url: "요청"
//  req.method: "함수"
// }

// res:
// res.writeHead: HTTP + 목적지 + 전달 데이터 파일 + 상태코드(200)
// res.write(): 응답의 실제 내용을 보내는 것
// res.end(): 응답 종료(종료 시점을 명확히 명시하면)

// GET www.google.com
// 응답==> 홈페이지

// GET(READ)
// POST(Create)
// PUT(Update)
// PATCH(UPDATE)
// DELETE(DELETE)
