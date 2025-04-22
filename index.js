const express = require("express");

const http = require("http");

const app = express();

const server = http.createServer(app);

const path = require("path");
const ejs = require("ejs");

app.use(express.static(path.join(__dirname, "public")));
//console.log(path.join(__dirname, 'public'))

app.set("view", path.join(__dirname, "public"));
app.engine("html", ejs.renderFile);

app.use("/", (req, res) => {
  res.render("index.html");
});

server.listen(3000, () => {
  console.log("Chat rodando em - http://localhost:3000");
});
