const express = require("express");
const socket = require("socket.io");
const axios = require("axios");

const app = express();

app.use(express.json());

const server = app.listen(9369, () => {
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
  const { txid, valor } = req.body;

  mudarStatus(txid, valor);

  res.send('Pronto.');
});

async function mudarStatus(txid, valor) {
  const obj = {
    txid,
    valor,
  };

  try {
    await axios.post('http://localhost/apis_centeringressos/apis6/clientes/pagamentos/pix/mudarstatus.php', obj).then((r) => {
      console.debug(r.data);
      io.sockets.in(r.data.id_ingresso).emit('pagamento', r.data);
    })
  } catch (error) {
    console.error(error)
  }
}
