const express = require("express");

const http = require("http");

const socketIO = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

const path = require("path");
const ejs = require("ejs");

app.use(express.static(path.join(__dirname, "public")));
//console.log(path.join(__dirname, 'public'))

app.set("view", path.join(__dirname, "public"));
app.engine("html", ejs.renderFile);

app.use("/", (req, res) => {
  res.render("index.html");
});

/* Logica do socket.io - Envio e propagação de mensagens  */
let messages = [];
/* Estrutura de conexão do socket.io */
io.on("connection", (socket) => {
  /* Teste de conexão*/
  console.log("Novo usuário conectado: " + socket.id);

  /*Recupera e mantem as mensagens entre o front e o back:*/
  socket.emit("previousMessage", messages);
  // Logica de chat quando uma mensagem é enviada
  socket.on("sendMessage", (data) => {
    //adiciona a mensagem no final do array de mensagem
    messages.push(data);
    socket.broadcast.emit("receivedMessage", data);
  });
});

server.listen(3000, () => {
  console.log("Chat rodando em - http://localhost:3000");
});
