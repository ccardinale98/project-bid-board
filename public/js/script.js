var projectModalEl = $('#project-modal');
var projectFormEl = $('#project-form');
var projectDisplayEl = $('#project-display');
var projectNameInputEl = $('#project-name-input');
var projectTypeInputEl = $('#project-type-input');
var projectDescInputEl = $('#project-desc-input');
var dueDateInputEl = $('#due-date-input');

function printProjectData(name, type, desc, dueDate) {
    var projectRowEl = $('<tr>');
  
    var projectNameTdEl = $('<td>').addClass('p-2').text(name);
  
    var projectTypeTdEl = $('<td>').addClass('p-2').text(type);
  
    var projectDescInputEl = $('<td>').addClass('p-2').text(desc);
  
    var dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);
  
    var deleteProjectBtn = $('<td>')
      .addClass('p-2 delete-project-btn text-center')
      .text('X');
  
    projectRowEl.append(
      projectNameTdEl,
      projectTypeTdEl,
      projectDescInputEl,
      dueDateTdEl,
      deleteProjectBtn
    );
  
    projectDisplayEl.append(projectRowEl);
  
    projectModalEl.modal('hide');
  }

  function handleDeleteProject(event) {
    console.log(event.target);
    var btnClicked = $(event.target);
    btnClicked.parent('tr').remove();
  }

  function handleProjectFormSubmit(event) {
    event.preventDefault();
    // event.stopPropagation();
    // $('#project-modal').modal('toggle');
  
    var projectName = projectNameInputEl.val().trim();
    var projectType = projectTypeInputEl.val().trim();
    var projectDesc = projectDescInputEl.val().trim();
    var dueDate = dueDateInputEl.val().trim();
  
    printProjectData(projectName, projectType, projectDesc, dueDate);
  
    projectFormEl[0].reset();
  }
  
  projectFormEl.on('submit', handleProjectFormSubmit);
  projectDisplayEl.on('click', '.delete-project-btn', handleDeleteProject);
  dueDateInputEl.datepicker({ minDate: 1 });
  

  