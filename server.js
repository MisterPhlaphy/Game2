const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = [];

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.emit('load all messages', messages);

    socket.on('new message', (data) => {
        messages.push(data);
        if (messages.length > 150) messages
