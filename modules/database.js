const fs = require("fs").promises;
const path = require("path");

async function addUser(object) {
  let filePath = path.join(__dirname, "data.json");
  let DATA = await readFile(filePath);
  DATA.users.push(object);
  let res = await writeFile(DATA, filePath);
  return res;
}

async function writeFile(data, path) {
  let res = await fs.writeFile(path, JSON.stringify(data));
  return res;
}

async function readFile(path) {
  let file = await fs.readFile(path);
  return JSON.parse(file);
}

module.exports = {
  addUser,
  writeFile,
  readFile,
};
