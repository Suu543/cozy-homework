function 로그인() {
  return new Promise((resolve, reject) => {
    console.log("데이터베이스에가서 입력한 ID + PASSWORD가 유효한지 검사한다");
    resolve({ id: "yongsu", pw: "12345"})
  });
}

function 개인정보(user) {
  return new Promise((resolve, reject) => {
    console.log("사용자정보: ", user);
    resolve("ok")
  });
}

function 개인정보업데이트(message) {
  return new Promise((resolve, reject) => {
    if (message === "ok") {
      resolve("업데이트성공")
    } else {
      reject("업데이트실패")
    }
  });
}

로그인()
  .then((user) => 개인정보(user))
  .then((message) => 개인정보업데이트(message))
  .then((결과) => console.log(결과))
  .catch(error => console.log(error))


// 1. a라는 함수는 프로미스 클래스를 리턴한다
// 2. a의 리턴값은 new Promise 클래스를 실행해서 복제본을 만든 값이다.
// 3. promise안에는 then 이라는 함수가 존재한다

a()
  .then((resolve값) => console.log(resolve값)) 
  .catch((reject값) => reject값);

// 함수: 값으로 사용될 수 있다
// 함수는 리턴 키워드를 만나면 종료된다.
function a() {
  return "hello";
}

// 1. 변수
// 2. 익명함수
let b = function (a, b) {
  return a + b;
};

// 3. 화살표 함수(arrow function)
let c = (a, b) => {
  return a + b;
};

// 중괄호 없이, 화살표 함수뒤에 하나의 수식만 있는 경우 그게 리턴값이다\
// 화살표 함수에서 중괄호를 적는 순간 무조건 리턴 값을 작성해줘야한다.
let d = (a, b) => a + b;

// 4. 함수의 인자값으로 함수가 전달될 수 있다
// 인자값으로 함수를 전달할 때, 이렇게 전달된 함수를 우리는 콜백이라고 부른다.
function e(함수1, 함수2) {
  함수1();
  함수2();
}

e(
  () => console.log("a"),
  () => console.log("b")
);

e(
  function () {
    console.log("a");
  },
  function () {
    console.log("b");
  }
);

// 5. 함수는 함수의 리턴값으로 사용될 수 있다.
function f() {
  return () => console.log("함수 리턴");
}

let p = f();
p();

a() == return값


function a() {
  for (let i = 0; i < 10; i++) {
    console.log(i)
  }
  console{"씨발"}
}