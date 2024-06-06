const socket = io();

let username = null;

function setUsername() {
    username = document.getElementById('username').value.trim();
    if (username) {
        document.getElementById('message').disabled = false;
        document.getElementById('username-choice').style.display = 'none';
    } else {
        alert('Please enter a username.');
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message && username) {
        socket.emit('new message', { user: username, text: message });
        messageInput.value = '';
    } else {
        alert('Message cannot be empty.');
    }
}

socket.on('load all messages', function(messages) {
    messages.forEach(message => displayMessage(message));
});

socket.on('message received', function(message) {
    displayMessage(message);
});

function displayMessage(data) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = `${data.user}: ${data.text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
