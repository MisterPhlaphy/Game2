const socket = io();

let userType = null;

function setNickname() {
    const nicknameSelect = document.getElementById('nickname');
    const passwordInput = document.getElementById('password');

    const nickname = nicknameSelect.value;
    const password = passwordInput.value;

    if (nickname === 'MASTER' && password !== 'I LOSE') {
        alert('Incorrect password for MASTER!');
    } else {
        userType = nickname;
        localStorage.setItem('userType', userType); // Store the userType in localStorage
        window.location.href = 'chat.html'; // Redirect to chat page
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message');
    const message = messageInput.value.trim();
    if (message && userType) {
        socket.emit('new message', { userType, text: message });
        messageInput.value = '';
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

// On chat page load, retrieve the userType from localStorage
document.addEventListener('DOMContentLoaded', () => {
    userType = localStorage.getItem('userType');
    if (!userType) {
        window.location.href = 'index.html'; // Redirect back to nickname selection if no userType is found
    }
});
