const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');
const createAccountSection = document.querySelector('#create-account')

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