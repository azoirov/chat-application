const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    path: "/",
  });
});

module.exports = {
  path: "/",
  router: router,
};
