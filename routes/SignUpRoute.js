const { readFile, addUser } = require("../modules/database");

const router = require("express").Router();
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { generateCrypt } = require("../modules/hash");

router.get("/", (req, res) => {
  res.render("signup", {
    title: "Sign Up",
    path: "/signup",
    error: "",
  });
});

router.post("/", async (req, res) => {
  let { name, email, password } = req.body;
  try {
    if (!(name && email && password)) throw "All fields must be filled";
    let filePath = path.join(__dirname, "..", "modules", "data.json");
    let DATA = await readFile(filePath);
    if (DATA.users.find((x) => x.email === email))
      throw "This email is already in use";
    let obj = {
      id: uuidv4(),
      name: name,
      email: email,
      password: await generateCrypt(password),
    };
    await addUser(obj);
    res.redirect("/signup");
  } catch (e) {
    res.render("signup", {
      title: "Sign Up",
      path: "/signup",
      error: e + "",
    });
  }
});

module.exports = {
  router,
  path: "/signup",
};
