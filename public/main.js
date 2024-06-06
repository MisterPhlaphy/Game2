const socket = io();

let userType = null;

function validateAndSetNickname() {
    const nickname = document.getElementById('nickname').value;
    const password = document.getElementById('password').value;

    if (nickname === 'MASTER' && password !== 'I LOSE') {
        alert('Incorrect password for MASTER!');
    } else {
        userType = nickname;
        document.getElementById('nickname-choice').style.display = 'none';
        document.getElementById('chat-container').style.display = 'flex';
        document.getElementById('message').focus();
    }
}

function sendMessage() {
    const message = document.getElementById('message').value.trim();
    if (message) {
        socket.emit('new message', { userType, text: message });
        document.getElementById('message').value = '';
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
    messageElement.style.color = data.userType === 'MASTER' ? 'red' : 'blue';
    messageElement.textContent = `${data.userType}: ${data.text}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
