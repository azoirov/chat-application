const { readFile } = require("../modules/database");

const router = require("express").Router();
const path = require("path");
const { confirmHash } = require("../modules/hash");

router.get("/", (req, res) => {
  res.render("login", {
    title: "Log In",
    path: "/login",
    error: "",
  });
});

router.post("/", async (req, res) => {
  let { email, password } = req.body;
  try {
    if (!(email && password)) throw "All fields must be completed";
    let filePath = path.join(__dirname, "..", "modules", "data.json");
    let DATA = await readFile(filePath);
    let user = DATA.users.find((x) => x.email === email);
    if (!user) throw "Email is not registered";
    let isTrust = await confirmHash(password, user.password);
    if (!isTrust) throw `Incorrect password for ${user.email}`;
    res.redirect("/");
  } catch (e) {
    res.render("login", {
      title: "Log In",
      path: "/login",
      error: e + "",
    });
  }
});

module.exports = {
  router: router,
  path: "/login",
};
