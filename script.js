const API_URL = 'https://api.jsonbin.io/v3/b/687ce881ee4b395e61f23b17';
const HEADERS = {
  'X-Master-Key': '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m',
  'Content-Type': 'application/json'
};

let messages = [];
const pfps = [
  'profile pictures/buddha.jpg',
  'profile pictures/adidas.jpg',
  'profile pictures/barcelona.jpg',
  'profile pictures/car.jpg',
  'profile pictures/messi.jpg',
  'profile pictures/defult.jpg',
  'profile pictures/drawing.jpg',
  'profile pictures/laptop.jpg',
  'profile pictures/spiderman.jpg'
];

let pfpIndex = 0;

const profileSection = document.getElementById('profileSection'),
      chatSection = document.getElementById('chatSection'),
      pfpPreview = document.getElementById('pfpPreview'),
      usernameInput = document.getElementById('usernameInput'),
      currentUsername = document.getElementById('currentUsername'),
      messagesDiv = document.getElementById('messages'),
      messageForm = document.getElementById('messageForm'),
      messageInput = document.getElementById('messageInput'),
      joinBtn = document.getElementById('joinBtn');

// Initialize profile picture preview
pfpPreview.src = pfps[pfpIndex];

function prevPfp() {
  pfpIndex = (pfpIndex - 1 + pfps.length) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}
function nextPfp() {
  pfpIndex = (pfpIndex + 1) % pfps.length;
  pfpPreview.src = pfps[pfpIndex];
}

// Enable/disable join button depending on username length
usernameInput.addEventListener('input', () => {
  joinBtn.disabled = usernameInput.value.trim().length < 3;
});
joinBtn.disabled = true;

function createAccount() {
  const name = usernameInput.value.trim();
  if (name.length < 3) return alert('Username must be at least 3 characters.');
  localStorage.setItem('username', name);
  localStorage.setItem('pfp', pfps[pfpIndex]);
  currentUsername.textContent = '@' + name;
  profileSection.classList.remove('active');
  chatSection.classList.add('active');
  messageInput.focus();
  updateChat();
}

function renderMessages() {
  const user = localStorage.getItem('username');
  messagesDiv.innerHTML = '';
  messages.forEach(msg => {
    const div = document.createElement('div');
    div.className = `message ${msg.username === user ? 'sent' : 'received'}`;
    div.innerHTML = `
      <img src="${msg.pfp}" alt="User profile picture">
      <div class="bubble"><strong>@${msg.username}</strong>${escapeHtml(msg.message)}</div>
    `;
    messagesDiv.appendChild(div);
  });
  // Scroll smoothly to bottom
  messagesDiv.scrollTo({ top: messagesDiv.scrollHeight, behavior: 'smooth' });
}

function updateChat() {
  fetch(API_URL, { headers: HEADERS })
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch messages');
      return res.json();
    })
    .then(data => {
      if (data && data.record && Array.isArray(data.record)) {
        messages = data.record;
        renderMessages();
      }
    })
    .catch(err => {
      console.error('Error fetching messages:', err);
    });
}

// Escaping message to prevent HTML injection
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}

messageForm.addEventListener('submit', e => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (!msg) return;
  const username = localStorage.getItem('username');
  const pfp = localStorage.getItem('pfp');
  const newMessage = {
    username,
    pfp,
    date: new Date().toISOString(),
    message: msg
  };
  messages.push(newMessage);
  renderMessages();
  messageInput.value = '';
  messageInput.focus();

  // Save updated messages to JSONBin (PUT)
  fetch(API_URL, {
    method: 'PUT',
    headers: HEADERS,
    body: JSON.stringify(messages)
  }).catch(err => {
    console.error('Error saving message:', err);
  });
});

// On load: check if user is logged in
if (!localStorage.getItem('username')) {
  profileSection.classList.add('active');
  chatSection.classList.remove('active');
} else {
  currentUsername.textContent = '@' + localStorage.getItem('username');
  profileSection.classList.remove('active');
  chatSection.classList.add('active');
  updateChat();
  messageInput.focus();
}

// Update chat every 3 seconds to reduce spammy fetching
setInterval(updateChat, 3000);
