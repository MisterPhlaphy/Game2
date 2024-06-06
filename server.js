const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const messagesFile = path.join(__dirname, 'messages.json');

let messages = [];

// Load messages from the file if it exists
if (fs.existsSync(messagesFile)) {
    const data = fs.readFileSync(messagesFile);
    messages = JSON.parse(data);
}

app.use(express.static('public'));

// Handle new messages
io.on('connection', (socket) => {
    socket.emit('load all messages', messages);

    socket.on('new message', (data) => {
        messages.push(data);
        if (messages.length > 150) messages.shift(); // Keep only the last 150 messages

        // Save messages to the file
        fs.writeFileSync(messagesFile, JSON.stringify(messages));

        io.emit('message received', data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
