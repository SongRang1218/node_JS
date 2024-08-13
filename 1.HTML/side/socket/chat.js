const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const io = new Server(server);

// const path = require('path');
// const _path = path.join(__dirname, '/');
// app.use('/', express.static(_path));

app.get('/', (req, res) => res.sendFile(__dirname + '/index_GPT.html'));

io.on('connection', (socket) => {
    console.log(1, '접속됨', socket.id);
    socket.on('chat message', (msg) => {
        console.log(2, msg);
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
    console.log(`listening on port http://localhost:${3000}`);
});
