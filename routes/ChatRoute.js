const router = require("express").Router();
const { readFile } = require("../modules/database");
const path = require("path");
const { addMess } = require("../modules/database");

router.get("/", async (req, res) => {
  let filePath = path.join(__dirname, "..", "modules", "data.json");
  let DATA = await readFile(filePath);
  let chats = [];
  if (req.user) {
    chats =
      DATA.users.length !== 1
        ? DATA.users.filter((x) => x.id != req.user.id)
        : [{ name: "No chats yet" }];
  }
  res.render("chat", {
    path: "/chat",
    title: "Chat",
    user_name: req.user?.name,
    token: req.cookies.token,
    chats: chats,
    name: chats[0]?.name,
    userMess: [{ id: chats[0]?.id }],
  });
});

let obj = {};

router.get("/:id/", async (req, res) => {
  let id = req.params.id;

  let filePath = path.join(__dirname, "..", "modules", "data.json");
  let file = await readFile(filePath);
  let users = file.users;
  let chats =
    file.users.length !== 1
      ? file.users.filter((x) => x.id != req.user.id)
      : [{ name: "No chats yet" }];
  let user = users.find((x) => x.id === id);
  let DATA = await readFile(
    path.join(__dirname, "..", "modules", "messages.json")
  );
  let messages = DATA.messages;
  let renderedMess = messages.filter(
    (mess) =>
      mess.from == (req.user?.id || user.id) &&
      mess.to == (req.user?.id || user.id)
  );

  res.render("chat", {
    path: "/chat",
    title: "Chat",
    user_name: req.user?.name,
    user_id: req.user?.id,
    chats: chats,
    userMess: user,
    token: req.cookies.token,
    messages: messages,
  });
});

router.post("/:id", async (req, res) => {
  let id = req.params.id;
  let { mess } = req.body;
  if (mess) {
    let obj = {
      from: req.user?.id,
      to: id,
      text: mess,
    };
    await addMess(obj);
    res.redirect(`/chat/${id}`);
  }
});

// router.s("/", async (req, res) => {
//   let id = req.params.id;
//   let { mess } = req.body;
//   if (mess) {
//     let obj = {
//       from: req.user?.id,
//       to: id,
//       text: mess,
//     };
//     await addMess(obj);
//     res.redirect(`/chat/${req.params.id}`);
//   }
// });

module.exports = {
  router: router,
  path: "/chat",
};
