// 클라이언트가 서버에 전달한 요청을 해석할 때 사용하는 함수 혹은 도구
function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = { getReqData };

