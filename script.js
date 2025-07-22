const API_URL = 'https://api.jsonbin.io/v3/b/687ce881ee4b395e61f23b17';
const HEADERS = {
  'X-Master-Key': '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m',
  'Content-Type': 'application/json'
};

let messages = [];
let pfps = ['profile pictures/buddha.jpg','profile pictures/adidas.jpg','profile pictures/barcelona.jpg','profile pictures/car.jpg','profile pictures/messi.jpg','profile pictures/defult.jpg','profile pictures/drawing.jpg','profile pictures/laptop.jpg','profile pictures/spiderman.jpg']
let pfpIndex = 0;

const profileSection = document.getElementById('profileSection');
const chatSection = document.getElementById('chatSection');
const pfpPreview = document.getElementById('pfpPreview');
const usernameInput = document.getElementById('usernameInput');
const currentUsername = document.getElementById('currentUsername');
const messagesDiv = document.getElementById('messages');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

function prevPfp() {
  pfpIndex = (pfpIndex - 1 + pfps.length) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}

function nextPfp() {
  pfpIndex = (pfpIndex + 1) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}

function createAccount() {
  const username = usernameInput.value.trim();
  if (!username) return;

  localStorage.setItem('username', username);
  localStorage.setItem('pfp', pfps[pfpIndex]);

  currentUsername.textContent = '@' + username;
  profileSection.classList.remove('active');
  chatSection.classList.add('active');
  updateChat();
}

function renderMessages() {
  messagesDiv.innerHTML = '';
  const user = localStorage.getItem('username');
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = 'message ' + (msg.username === user ? 'sent' : 'received');

    div.innerHTML = `
      <img src="${msg.pfp}" alt="pfp">
      <div><strong>${msg.username}</strong><br>${msg.message}</div>
    `;
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
    })
    .catch(err => console.error('Fetch error:', err));
}

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = localStorage.getItem('username');
  const pfp = localStorage.getItem('pfp');
  const msg = messageInput.value.trim();
  if (!msg) return;

  const newMsg = {
    username,
    pfp,
    date: new Date().toISOString(),
    message: msg
  };

  messages.push(newMsg);
  renderMessages();
  messageInput.value = '';

  fetch(API_URL, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(messages)
  });
});

setInterval(updateChat, 200);

// Start on profile page
if (!localStorage.getItem('username')) {
  profileSection.classList.add('active');
} else {
  currentUsername.textContent = '@' + localStorage.getItem('username');
  chatSection.classList.add('active');
  updateChat();
}