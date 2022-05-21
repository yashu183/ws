// backeend file
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');

const PORT = 3000;

const app = express();
const server = http.createServer(app)
const io = socketio(server); // It takes HTTP server

app.use(express.static(path.resolve(__dirname, './public')));


server.listen(PORT, () => {
    try {
        console.log('server is listening on', PORT);  
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})

io.on('connection', (socket) => {
    console.log('new WS connection...');
    socket.emit('message', 'Welcome to the server from the server'); // single user thats conected
    socket.broadcast.emit('message', 'A user joined the server'); // emits to everyone except the connected user
    io.emit(); // everyone including the connected user
    socket.on('disconnect', (disconnectMessage) => {
        io.emit('message', 'user has left the server'); // emits to all the users that conneted usr has left the server
    })
})
