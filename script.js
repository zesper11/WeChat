const userInput = document.querySelector('.username-input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');

userInput.addEventListener('click' , () => {
    let username = userInput.value;
    localStorage.setItem('username' , username);
    console.log(userInput.value);
})
    



