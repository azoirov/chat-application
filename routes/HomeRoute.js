const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("index", {
    title: "Home Page",
    path: "/",
    user_name: req.user?.name,
  });
});

module.exports = {
  path: "/",
  router: router,
};
