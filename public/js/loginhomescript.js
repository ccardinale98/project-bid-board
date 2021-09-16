alert("Welcome to Project Bid Board!");

var fetchSignupButton = document.getElementById('signup-button');
var fetchLoginButton = document.getElementById('login-button');
var signupSuccessAlert = document.getElementById('signupSuccessMsg');
var testMessage = ('test message');



function messageSend() {
    fetch(testMessage)
        .then (function(response){
            console.log(response);
            var createMessage = document.createElement('p');
            createMessage.textContent = ("signup successful!");
            signupSuccessAlert.appendChild(createMessage);
        });
};
fetchLoginButton.addEventListener('click', messageSend);