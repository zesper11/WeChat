const userInput = document.querySelector('#create-account input');
const createAccountNextBtn = document.querySelector('.create-account-next-btn');

createAccountNextBtn.onClick = () => {
    let username = userInput.value;
    localStorage.setItem('username' , username);
}