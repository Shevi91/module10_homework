const socket = new WebSocket('wss://echo-ws-service.herokuapp.com');

const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const geoButton = document.getElementById('geoButton');

socket.onmessage = function (event) {
  addMessageToChat(`Сообщение от сервера: ${event.data}`);
};

sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message) {
    addMessageToChat(`Сообщение отправителя: ${message}`);
    socket.send(message);
    messageInput.value = '';
  }
});

geoButton.addEventListener('click', () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const geoLink = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}`;
      addMessageToChat(`Гео-локация: <a href="${geoLink}" target="_blank">Ваше местоположение</a>`);
      socket.send(`Гео-локация: ${geoLink}`);
    });
  } else {
    addMessageToChat("Гео-локация не поддерживается вашим браузером");
  }
});

function addMessageToChat(message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = message;
  messagesContainer.appendChild(messageElement);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}