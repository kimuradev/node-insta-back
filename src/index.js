const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();

//acesso ao protocolo http
const server = require('http').Server(app);
//acesso via web socket
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-xjll8.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true
});

// midleware para disponibilizar o socket na app
app.use((req, res, next) => {
  req.io = io;

  //continue executar
  next();
});

app.use(cors());

app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads', 'resized')));

app.use(require('./routes'));
server.listen(3333);
