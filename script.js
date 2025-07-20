const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');
const createAccountSection = document.querySelector('#create-account');
const pfpBtnNext = document.querySelector('.select-pfp-next-btn');
const pfpBtnBack = document.querySelector('.select-pfp-back-btn');
const pfp = document.querySelector('.select-pfp img');
const createAccountMsg = document.querySelector('.create-account-message');


const profilepictures = [
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
pfp.src = profilepictures[pfpIndex];


pfpBtnBack.onclick = () => {
  pfpIndex--;
  if (pfpIndex < 0) pfpIndex = profilepictures.length - 1;
  pfp.src = profilepictures[pfpIndex];
};

pfpBtnNext.onclick = () => {
  pfpIndex++;
  if (pfpIndex >= profilepictures.length) pfpIndex = 0;
  pfp.src = profilepictures[pfpIndex];
};

// Create account logic
createAccountNextBtn.addEventListener('click', () => {
  let username = userInput.value.trim();
  if (username.length >= 3) {
    localStorage.setItem('username', username);
    localStorage.setItem('pfp', profilepictures[pfpIndex]);
    console.info(`registered as @${username}`);
    createAccountSection.style.display = 'none';
  } else {
    createAccountMsg.textContent = 'The username must be three characters or longer and should not contain any offensive words';
  }
});

// Check if user is already logged in on page load
function whileLoading() {
  if (localStorage.getItem('username')) {
    createAccountSection.style.display = 'none';
    console.info(`logged in as @${localStorage.getItem('username')}`);
  }
}

whileLoading();

// JSONBin setup
const BIN_ID = '687ce881ee4b395e61f23b17';
const API_KEY = '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m';
const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const HEADERS = {
  'X-Master-Key': API_KEY,
  'Content-Type': 'application/json'
};

let messages = []; 


async function loadMessages() {
  try {
    const res = await fetch(API_URL, { headers: HEADERS });
    const data = await res.json();
    messages = data.record || [];
    console.info(`Loaded ${messages.length} messages from JSONBin.`);
    
   
    processMessages(messages);
  } catch (err) {
    console.error('Failed to fetch from JSONBin:', err);
  }
}

function processMessages(msgArray) {
  msgArray.forEach(msg => {
    console.log(`${msg.username}: ${msg.message}`);
  });
  
}

loadMessages();
