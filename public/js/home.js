// alert("Welcome to Project Bid Board!");

$('#signup-button').on('click', function() { 
    var company_name = $('#username').val();
    var email = $('#email').val();
    var password = $('#password').val();
    var role = $('#role').val().toLowerCase()

    createUser(company_name, email, password, role)
})

const createUser = async (company_name, email, password, role) => {
    const response = await fetch(`/create`, {
        method: 'POST',
        body: JSON.stringify({ company_name, email, password, role }),
        headers: { 'Content-Type': 'application/json' },
    })

    console.log(response.statusText)
}

$('#login-button').on('click', function() {
    var email = $('#login-email').val()
    var password = $('#login-password').val()

    loginUser(email, password)
})

const loginUser = async (email, password) => {
    const response = await fetch (`/login`, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
    })

    console.log(response.statusText)
}

