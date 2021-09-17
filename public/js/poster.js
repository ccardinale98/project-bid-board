// var projectModalEl = $('#project-modal');
// var projectFormEl = $('#project-form');
// var projectDisplayEl = $('#project-display');
// var projectNameInputEl = $('#project-name-input');
// var projectTypeInputEl = $('#project-type-input');
// var projectDescInputEl = $('#project-desc-input');
// var dueDateInputEl = $('#due-date-input');

// const { response } = require("express")

// function printProjectData(name, type, desc, dueDate) {
//     var projectRowEl = $('<tr>');
  
//     var projectNameTdEl = $('<td>').addClass('p-2').text(name);
  
//     var projectTypeTdEl = $('<td>').addClass('p-2').text(type);
  
//     var projectDescInputEl = $('<td>').addClass('p-2').text(desc);
  
//     var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);
  
//     var deleteProjectBtn = $('<td>')
//       .addClass('p-2 delete-project-btn text-center')
//       .text('X');
  
//     projectRowEl.append(
//       projectNameTdEl,
//       projectTypeTdEl,
//       projectDescInputEl,
//       dueDateTdEl,
//       deleteProjectBtn
//     );
  
//     projectDisplayEl.append(projectRowEl);
  
//     projectModalEl.modal('hide');
//   }

//   function handleDeleteProject(event) {
//     console.log(event.target);
//     var btnClicked = $(event.target);
//     btnClicked.parent('tr').remove();
//   }

//   function handleProjectFormSubmit(event) {
//     event.preventDefault();
//     // event.stopPropagation();
//     // $('#project-modal').modal('toggle');
  
//     var projectName = projectNameInputEl.val().trim();
//     var projectType = projectTypeInputEl.val().trim();
//     var projectDesc = projectDescInputEl.val().trim();
//     var dueDate = dueDateInputEl.val().trim();
  
//     printProjectData(projectName, projectType, projectDesc, dueDate);
  
//     projectFormEl[0].reset();
//   }
  
//   projectFormEl.on('submit', handleProjectFormSubmit);
//   projectDisplayEl.on('click', '.delete-project-btn', handleDeleteProject);
//   dueDateInputEl.datepicker({ minDate: 1 });

var currentUser = []
var currentProject = []

const getCurrentUser = async () => {
  try {
    const response = await fetch(`/current`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const projects = await response.json();
    console.log(projects)
    console.log(projects.id)
    currentUser.push(projects.id)
  } catch (err) {
    console.log(err)
  }
}

const getProjects = async () => {
  try {
    const response = await fetch(`/api/project/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const projects = await response.json();
    console.log(projects)
    
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].poster_id == currentUser) {
        console.log(projects[i])

        var projectBoxEl = document.createElement('div')
        projectBoxEl.className = 'project-box'
        projectBoxEl.setAttribute('id', `${projects[i].id}-project`)
        
        var titleEl = document.createElement('h3');
        titleEl.innerHTML = projects[i].project_name;
        projectBoxEl.append(titleEl);

        var descEl = document.createElement('p1');
        descEl.innerHTML = projects[i].description;
        projectBoxEl.append(descEl);
        
        $('#project-list').append(projectBoxEl);

        $('.project-box').on('click', function () {
          currentProject.push(this.id.charAt(0));
          getBids()
        })
      }
    }

  } catch (err) {
    console.log(err)
  }
}

const getBids = async () => {
  const response = await fetch(`/api/bid/bids`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  const bids = await response.json();
  console.log(bids)

  for (var i = 0; i < bids.length; i++) {
    if (bids[i].project_id == currentProject) {
      var bidBoxEl = document.createElement('div')
      bidBoxEl.className = 'bid-box'
      bidBoxEl.setAttribute('id', `${bids[i].id}-bid`)
      
      var titleEl = document.createElement('h3');
      titleEl.innerHTML = `$${bids[i].bid_amount}`;
      bidBoxEl.append(titleEl);

      var companyEl = document.createElement('h4');
      var bidderInfo = await getBidder(bids[i].user_id)
      companyEl.innerHTML = bidderInfo.company_name;
      bidBoxEl.append(companyEl);

      var emailEl = document.createElement('p1');
      console.log(bids[i].user_id)
      emailEl.innerHTML = await bidderInfo.email;
      bidBoxEl.append(emailEl);

      var statusEl = document.createElement('p1');
      statusEl.innerHTML = bids[i].status;
      statusEl.className = 'bid-status';
      bidBoxEl.append(statusEl);
      
      $('#bid-list').append(bidBoxEl);
      
    }
  }
}

const getBidder = async (user_id) => {
  try {
    const response = await fetch(`/api/user/${user_id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })

    const bidder = await response.json();
    console.log(bidder);
    console.log(bidder.company_name);
    return await bidder;
  
  } catch (err) {
    console.log(err);
  }
}

getBids();
getCurrentUser();
getProjects();
  

  