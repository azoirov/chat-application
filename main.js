const express = require("express");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`SERVER READY AT localhost:${8080}/`));
