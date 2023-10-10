// 클라이언트로부터 요청 데이터를 읽어오는 함수를 정의합니다.
function getReqData(req) {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      // 클라이언트로부터 전달되는 데이터를 조각(chunk) 단위로 받아서 body 변수에 추가합니다.
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      // 클라이언트로부터 데이터 수신이 완료되면 end 이벤트가 발생하고, 그때 데이터를 반환합니다.
      req.on("end", () => {
        resolve(body);
      });
    } catch (error) {
      // 오류가 발생하면 오류를 반환합니다.
      reject(error);
    }
  });
}

// getReqData 함수를 모듈로 내보냅니다.
module.exports = getReqData;
