const onPageLoad = async () => {
    const response = await fetch(`/api/project/projects`, {
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
        
        $('#project-list').append(projectBoxEl)
    }
}

onPageLoad();    
