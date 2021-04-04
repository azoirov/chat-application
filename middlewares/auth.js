const { readFile } = require("../modules/database");
const { checkToken } = require("../modules/jwt");
const path = require("path");

const authMiddleware = async (req, res, next) => {
  let token = req.cookies?.token;
  if (token) {
    let user = checkToken(token);
    user = await findUser(user.id);
    if (user) {
      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
      };
    }
  }

  next();
};

// module.exports = { authMiddleware };

async function findUser(id) {
  let filePath = path.join(__dirname, "..", "modules", "data.json");
  let DATA = await readFile(filePath);
  return DATA.users.find((x) => x.id == id);
}

module.exports = authMiddleware;
