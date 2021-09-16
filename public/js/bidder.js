// const { response } = require("express");
console.log('bidder.js')
var user_id = [];
console.log(user_id)
console.log(user_id.toString())
var project_id = [];
console.log(project_id)
var currentBids = [];
console.log(currentBids)
var bidToUpdate = [];
console.log(bidToUpdate)

const loadProjects = async () => {
    try{
    const response = await fetch(`/api/project/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const projects = await response.json()
    console.log(projects[0])

    for (var i = 0; i < projects.length; i++) {
        var list = projects[i]

        var projectBoxEl = document.createElement('div')
        projectBoxEl.className = 'project-box'
        
        var titleEl = document.createElement('h3');
        titleEl.innerHTML = list.project_name;
        console.log(list)
        projectBoxEl.append(titleEl);

        var descEl = document.createElement('p1');
        descEl.innerHTML = list.description;
        projectBoxEl.append(descEl)
        
        var bidButtonEl = document.createElement('button')
        bidButtonEl.type = 'button'
        bidButtonEl.setAttribute('id', `${list.id}-button`)
        bidButtonEl.setAttribute('class', `place-bid-button`)
        bidButtonEl.innerHTML = 'Place Bid'
        projectBoxEl.append(bidButtonEl)

        bidButtonEl.addEventListener('click', function() {
            if (currentBids.includes(parseInt(this.id.charAt(0))) == true) {
                console.log('already have bid');
                modal2();
            } else {
                console.log(this.id.charAt(0));
                console.log(currentBids)
                modal();
                project_id.push(this.id.charAt(0))
            }
        })

        $('#project-list').append(projectBoxEl)
    }
    } catch (err) {
        console.log(err)
    }
}

$('.place-bid-button').on('click', function() {
    if (currentBids.includes(parseInt(this.id.charAt(0))) == true) {
        console.log('already have bid');
        modal2();
    } else {
        console.log(this.id.charAt(0));
        console.log(currentBids)
        modal();
        project_id.push(this.id.charAt(0))
    }
})

function modal() {
    console.log('Modal is working!')
    $('#modalLoginForm').modal('toggle') 
}

function modal2() {
    console.log('Error Modal working!')
    $('#modalLoginForm2').modal('toggle') 
}

function modal3() {
    console.log('Update Modal working!')
    $('#modalLoginForm3').modal('toggle') 
}

const loadUser = async () => {
    const response = await fetch(`/api/user/3`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const company = await response.json()
    console.log(company)
    console.log(company.company_name)

    user_id.push(company.id)

    $('.navbar-brand').text(`Hello, ${company.company_name}`)
}

const loadBids = async () => {
    const response = await fetch(`/api/bid/bids`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    })

    const bids = await response.json()
    console.log(bids)

    for (var i = 0; i < bids.length; i++) {
        list = bids[i]

        if (list.user_id == 3) {
            const loadCertainProject = async () => {
                console.log(list)
                console.log('hello')
                console.log(list.project_id)
                const responseP = await fetch(`/api/project/${list.project_id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })
            
                const projectBids = await responseP.json()
                console.log(projectBids)
                
                var titleEl = document.createElement('h3');
                titleEl.innerHTML = projectBids.project_name;
                $(`#${projectBids.id}-bid-box`).append(titleEl);
                console.log(projectBids.project_name)
                console.log(projectBids.project_id)
            } 
            
            loadCertainProject()
            var bidBoxEl = document.createElement('div')
            bidBoxEl.className = 'bid-box'
            bidBoxEl.setAttribute('id', `${list.project_id}-bid-box`)
    
            var descEl = document.createElement('p1');
            descEl.innerHTML = `Bid Amount: $${list.bid_amount}`;
            bidBoxEl.append(descEl)

            var statusEl = document.createElement('p1');
            statusEl.innerHTML = `Bid Status: ${list.status}`;
            statusEl.setAttribute('id', `${list.project_id}-bid-status`)
            bidBoxEl.append(statusEl)

            var updateButtonEl = document.createElement('button')
            updateButtonEl.type = 'button'
            updateButtonEl.setAttribute('id', `${list.id}-update-button`)
            updateButtonEl.setAttribute('class', `update-bid-button`)
            updateButtonEl.innerHTML = 'Update Bid'
            bidBoxEl.append(updateButtonEl)

            updateButtonEl.addEventListener('click', function() {
                bidToUpdate.push(this.id.charAt(0))
                console.log(this.id.charAt(0))
                modal3()
            })
            
            currentBids.push(list.project_id)

            $('#bid-list').append(bidBoxEl)
        }

        if (list.status == 'pending') {
            $(`#${list.project_id}-bid-status`).css('color', 'orange')
        } else if (list.status == 'approved') {
            $(`#${list.project_id}-bid-status`).css('color', 'green')
        } else {
            $(`#${list.project_id}-bid-status`).css('color', 'red')
        }
    }
}

$('#bid-submit').on('click', function() {
    console.log('hello');
    var bid_amount = $('#defaultForm-number').val();
    console.log(bid_amount);
    createBid(bid_amount);
    location.reload();
})

const createBid = async (amt) => {
    console.log(amt)
    console.log(user_id)
    console.log(project_id[0])
    project_id = project_id[0]
    bid_amount = amt

    const response = await fetch('/api/bid/', {
        method: 'POST',
        body: JSON.stringify({ project_id, user_id, bid_amount }),
        headers: { 'Content-Type': 'application/json' },
    })
    
    console.log(response.statusText)
}

$('#bid-update').on('click', function() {
    console.log('hello');
    var bid_amount = $('#defaultForm-number2').val();
    console.log(bid_amount);
    updateBid(bid_amount);
    location.reload();
})

const updateBid = async (amt) => {
    console.log(amt)
    console.log(project_id[0])
    project_id = project_id[0]
    bid_amount = amt

    if (bid_amount > 0) {
        const response = await fetch(`/api/bid/update/${bidToUpdate}`, {
            method: 'PUT',
            body: JSON.stringify({ bid_amount }),
            headers: { 'Content-Type': 'application/json' },
        })
    } else {
        const repsonse = await fetch(`/api/bid/${bidToUpdate}`, {
            method: 'DELETE',
        })
    }
    
    console.log(response.statusText)
}

$('#logout').on('click', function(event) {
    event.preventDefault();

    const logout = async () => {
        const response = await fetch('/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
      
        if (response.ok) {
          document.location.replace('/');
        } else {
          alert(response.statusText);
        }
    };

    logout()
})

loadProjects();  
loadUser();
loadBids(user_id[0]); 
