// Import modules Start --
const express = require("express");
const fs = require("fs");
const path = require("path");

require("dotenv").config();
// Import modules End --

// Start Server
const app = express();

// Middlewares Start --
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// Middlewares End --

// Settings Start --
app.set("view engine", "ejs");
// Settings End --

// Routes Start --
let routesPath = path.join(__dirname, "routes");
fs.readdir(routesPath, (err, files) => {
  files.forEach((file) => {
    let filePath = path.join(__dirname, "routes", file);
    let Route = require(filePath);
    if (Route.path && Route.router) app.use(Route.path, Route.router);
  });
});
// Routes End --

// Listen Start --
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`SERVER READY AT localhost:${8080}/`));
// Listen End --
