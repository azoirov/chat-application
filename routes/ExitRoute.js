const router = require("express").Router();

router.get("/", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = {
  path: "/exit",
  router: router,
};
