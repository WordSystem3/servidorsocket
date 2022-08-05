const express = require("express");
const cors = require("cors");
const socket = require("socket.io");

const app = express();

app.use(express.json());

const server = app.listen(3333, () => {
  console.log("Servidor iniciado!");
});

const io = socket(server);

// AO SE CONECTAR IRÁ DISPARAR UM console.debug(socket.id);
io.on("connection", function (socket) {
  console.debug(socket.id);

  // EMITIR UMA MENSAGEM PARA O CLIENTE
  io.emit('connected', `Olá, ${socket.id}`)

  // QUANDO O CLIENTE SE DESCONECTAR
  socket.on('disconnect', (reason) => {
    console.debug(reason);
  });
});

app.get('/teste', (req, res) => {
  io.emit('connected', 'Testando');
  
  res.send('Enviou informações para o cliente');
});