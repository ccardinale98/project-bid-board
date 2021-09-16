$('#login').on('click', function(event) {
    var email = 'joe123@gmail.com'
    var password = 'joepassword'
    const login = async (email, password) => {
        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        })
        
        console.log(response.statusText)
    }

    login(email, password);
    location.reload()
})