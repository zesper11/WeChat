const userInputValue = document.querySelector('.username-input').value;
const createAccountNextBtn = document.querySelector('.create-account-next-btn');

createAccountNextBtn.addEventListener('click' , () => {
    let username = userInputValue;
    localStorage.setItem('username' , username);
    console.log(userInputValue);
})
    



