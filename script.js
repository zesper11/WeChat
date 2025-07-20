const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');
const createAccountSection = document.querySelector('#create-account')
const pfpBtnNext = document.querySelector('.select-pfp-next-btn');
const pfpBtnBack = document.querySelector('.select-pfp-back-btn');
const pfp = document.querySelector('.select-pfp img');
const createAccountMsg = document.querySelector('.create-account-message');

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
        createAccountMsg.textContent = 'the username must be three characters or longer and shouldnot contain any offensive words'
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

// json bin message system

const BIN_ID = '687ce881ee4b395e61f23b17';
const API_KEY = '$2a$10$fv8piFnoMQmqN2haULO6B.J7lBcThIhQmnhQqchrj1CuG3uJ6E95m '; 

const API_URL = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
const HEADERS = {
  'X-Master-Key': API_KEY,
  'Content-Type': 'application/json'
};

let messages = []; // 🧠 Your global message array

// 📥 Fetch JSONBin and store in the array
fetch(API_URL, { headers: HEADERS })
  .then(res => res.json())
  .then(data => {
    messages = data.record; // ✅ JSONBin puts your array inside `record`


  })
  .catch(err => {
    console.error('Failed to fetch from JSONBin:', err);
  });


  function doSomethingWithMessages() {
  if (messages.length === 0) {
    // Not loaded yet, so wait and try again later
    console.log('Messages not loaded, waiting...');
    setTimeout(doSomethingWithMessages, 100); // try again after 100ms
    return;
  }

  // Now messages are loaded, do your stuff
  messages.forEach(msg => {
    console.log(msg.username + ': ' + msg.message);
  });
}
