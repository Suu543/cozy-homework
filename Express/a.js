function express(req, res, next) {
  return {
    get: (req, res, next) => {},
    post: (req, res, next) => {},
    put: (req, res, next) => {},
    delete: (req, res, next) => {},
    use: (req, res, next) => {},
  };
}

function use(req, res, next) {
  return (req, res, next) => {
    return (req, res, next) => {};
  };
}

function validateUser(req, res, next) {}
function validateAdmin(req, res, next) {}

const app = express();

use(req, res, next);

let use = [];

function next() {
  let req, res, next;

  for (let i = 0; i < use.length; i++) {
    const middleware = use.pop();
    middleware(req, res, next);
  }

  return {
    req,
    res,
    next,
  };
}
