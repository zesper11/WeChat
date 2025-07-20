const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');
const createAccountSection = document.querySelector('#create-account')
const pfpBtnNext = document.querySelector('.select-pfp-next-btn');
const pfpBtnBack = document.querySelector('.select-pfp-back-btn');

// scripts to run while loading 
whileLoading()


createAccountNextBtn.addEventListener('click' , () => {
    let username = userInput.value;
    localStorage.setItem('username' , username);
    console.info(`registered as @${userInput.value}`);
})

function whileLoading(){
    if(localStorage.getItem('username')){
        // createAccountSection.style.display = 'none';
        // console.info(`logged in as @${localStorage.getItem('username')}`)
    }
}

//profile picture script
const profilepictures = ['profile pictures/buddha.jpg','profile pictures/adidas.jpg','profile pictures/barcelona.jpg','profile pictures/car.jpg','profile pictures/messi.jpg','profile pictures/defult.jpg','profile pictures/drawing.jpg','profile pictures/laptop.jpg','profile pictures/spiderman.jpg']

pfpBtnBack.onclick = () => {
    console.log('click made')
}