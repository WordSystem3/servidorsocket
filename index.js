const express = require("express");
const socket = require("socket.io");
const axios = require("axios");

const app = express();

app.use(express.json());

const server = app.listen(5670, () => {
  console.log("Servidor iniciado!");
});

const io = socket(server);

// AO SE CONECTAR IRÁ DISPARAR UM console.debug(socket.id);
io.on("connection", function (socket) {
  console.debug(socket.id);

  // EMITIR UMA MENSAGEM PARA O CLIENTE
  socket.on('room', function (room) {
    socket.join(room);
    io.emit('conectouAoRoom', `Olá, ${socket.id} Você conectou ao SOCKET`);
  });
});

app.post('/pagar', (req, res) => {
  const { id_ingresso } = req.body;

  console.debug(req.body);

  io.sockets.in(id_ingresso).emit('pagamento', data);

  res.send('Pronto.');
});
