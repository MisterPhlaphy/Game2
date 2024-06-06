const socket = io();

let userType = null;

function validateAndSetNickname() {
    const nicknameSelect = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');
    const chatContainer = document.getElementById('chat-container');
    const nicknameChoice = document.getElementById('nickname-choice');
    const messageInput = document.getElementById('message');

    const nickname = nicknameSelect.value;
    const password = passwordInput.value;

    if (nickname === 'MASTER' && password !== 'I LOSE') {
        alert('Incorrect password for MASTER!');
        passwordInput.value = ''; // Clear the password field for security
    } else {
        userType = nickname;
        nicknameChoice.style.display = 'none';
        chatContainer.style.display = 'flex';
        messageInput.focus(); // Automatically focus the message input
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('new message', { userType, text: message });
        messageInput.value = ''; // Clear the input after sending
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
    chatBox.scrollTop = chatBox.scrollHeight; // Keep the newest messages visible
}
