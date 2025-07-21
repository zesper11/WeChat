const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');
const createAccountSection = document.querySelector('#create-account')
const pfpBtnNext = document.querySelector('.select-pfp-next-btn');
const pfpBtnBack = document.querySelector('.select-pfp-back-btn');
const pfp = document.querySelector('.select-pfp img');
const createAccountMsg = document.querySelector('.create-account-message');
const messageSent = document.querySelectorAll('.main-chat-interface sent span');
const messageReceived = document.querySelectorAll('.main-chat-interface received span');

// scripts to run while loading 
whileLoading()


createAccountNextBtn.addEventListener('click' , () => {
    let username = userInput.value;
    if(username.length >= 3){
    localStorage.setItem('username' , username);
    localStorage.setItem('pfp' , profilepictures[pfpIndex])
    console.info(`registered as @${userInput.value}`);
    createAccountSection.style.display = 'none';
    }else{
        createAccountMsg.textContent = 'the username must be three characters or longer and should not contain any offensive words'
    }
    
})

function whileLoading(){
    if(localStorage.getItem('username')){
        createAccountSection.style.display = 'none';
        console.info(`logged in as @${localStorage.getItem('username')}`)
    }
}

//profile picture script
const profilepictures = ['profile pictures/buddha.jpg','profile pictures/adidas.jpg','profile pictures/barcelona.jpg','profile pictures/car.jpg','profile pictures/messi.jpg','profile pictures/defult.jpg','profile pictures/drawing.jpg','profile pictures/laptop.jpg','profile pictures/spiderman.jpg']

pfpIndex = 0;
pfp.src = profilepictures[pfpIndex];

pfpBtnBack.onclick = () => {
    pfpIndex--
    if(pfpIndex === -1){
        pfpIndex = profilepictures.length - 1;
    }
    pfp.src = profilepictures[pfpIndex];
}

pfpBtnNext.onclick = () => {
    pfpIndex++
    if(pfpIndex === profilepictures.length){
        pfpIndex = 0;
    }
    pfp.src = profilepictures[pfpIndex];
}


//main chat function used jsonbin

const API_URL = 'https://api.jsonbin.io/v3/b/687ce881ee4b395e61f23b17/latest';
const HEADERS = {
  'X-Master-Key': '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m '
};
let messages = [];

function loadMessages() {
  fetch(API_URL, { headers: HEADERS })
    .then(res => res.json())
    .then(data => {
      messages = data.record || [];

      if (messages.length > 0) {
        messages.forEach(msg => {
        //   console.log(`${msg.username}: ${msg.message}`);
        messageReceived.innerHTML = msg.message;

        });
      } else {
        console.warn('No messages to display.');
      }
    })
    .catch(err => console.error('Failed to fetch messages:', err));
}


loadMessages(); // first time immediately
setInterval(loadMessages, 1000); 
