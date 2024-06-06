const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let messages = []; // Store chat messages

app.use(express.static('public')); // Serve static files from 'public' directory

// Socket.IO connection handler
io.on('connection', (socket) => {
    console.log('New user connected');

    // Emit all messages to the newly connected user
    socket.emit('load all messages', messages);

    // Listen for new messages
    socket.on('new message', (data) => {
        messages.push(data);
        if (messages.length > 150) {
            messages.shift(); // Keep only the last 150 messages
        }

        // Broadcast new message to all clients
        io.emit('message received', data);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
