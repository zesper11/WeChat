// script.js
const API_URL = 'https://api.jsonbin.io/v3/b/687ce881ee4b395e61f23b17';
const HEADERS = {
  'X-Master-Key': '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m',
  'Content-Type': 'application/json'
};

let messages = [],

pfps = ['profile pictures/buddha.jpg','profile pictures/adidas.jpg','profile pictures/barcelona.jpg','profile pictures/car.jpg','profile pictures/messi.jpg','profile pictures/defult.jpg','profile pictures/drawing.jpg','profile pictures/laptop.jpg','profile pictures/spiderman.jpg']
let pfpIndex = 0;

const profileSection = document.getElementById('profileSection'),
      chatSection = document.getElementById('chatSection'),
      pfpPreview = document.getElementById('pfpPreview'),
      usernameInput = document.getElementById('usernameInput'),
      currentUsername = document.getElementById('currentUsername'),
      messagesDiv = document.getElementById('messages'),
      messageForm = document.getElementById('messageForm'),
      messageInput = document.getElementById('messageInput');

function prevPfp() {
  pfpIndex = (pfpIndex - 1 + pfps.length) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}
function nextPfp() {
  pfpIndex = (pfpIndex + 1) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}
function createAccount() {
  const name = usernameInput.value.trim();
  if (name.length < 3) return;
  localStorage.setItem('username', name);
  localStorage.setItem('pfp', pfps[pfpIndex]);
  currentUsername.textContent = '@' + name;
  profileSection.classList.remove('active');
  chatSection.classList.add('active');
  updateChat();
}

function renderMessages() {
  const user = localStorage.getItem('username');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.username === user ? 'sent' : 'received'}`;
    div.innerHTML = `
      <img src="${msg.pfp}">
      <div class="bubble"><strong>${msg.username}</strong><br>${msg.message}</div>`;
    messagesDiv.appendChild(div);
  });
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function updateChat() {
  fetch(API_URL, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      messages = data.record || [];
      renderMessages();
    });
}

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (!msg) return;
  messages.push({
    username: localStorage.getItem('username'),
    pfp: localStorage.getItem('pfp'),
    date: new Date().toISOString(),
    message: msg
  });
  renderMessages();
  messageInput.value = '';
  fetch(API_URL, { method:'PUT', headers:HEADERS, body: JSON.stringify(messages) });
});

if (!localStorage.getItem('username')) {
  profileSection.classList.add('active');
} else {
  currentUsername.textContent = '@' + localStorage.getItem('username');
  chatSection.classList.add('active');
  updateChat();
}
setInterval(updateChat, 200);
