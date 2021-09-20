var currentUser = [];
var currentProject = [];
console.log(currentProject);

const getCurrentUser = async () => {
  try {
    const response = await fetch(`/current`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const user = await response.json();
    console.log(user);
    console.log(user.id);
    currentUser.unshift(user.id);

    $(".navbar-brand").text(`Hello, ${user.company_name}`).css({
      color: "white",
      "font-size": "2vw",
    });
  } catch (err) {
    console.log(err);
  }
};

const getProjects = async () => {
  try {
    const response = await fetch(`/api/project/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const projects = await response.json();
    console.log(projects);

    for (var i = 0; i < projects.length; i++) {
      if (projects[i].poster_id == currentUser) {
        console.log(projects[i]);

        var projectBoxEl = document.createElement("div");
        projectBoxEl.className = "project-box";
        projectBoxEl.setAttribute("id", `${projects[i].id}-project`);

        var titleEl = document.createElement("h3");
        titleEl.innerHTML = projects[i].project_name;
        projectBoxEl.append(titleEl);

        var descEl = document.createElement("p1");
        descEl.innerHTML = projects[i].description;
        projectBoxEl.append(descEl);

        var statusEl = document.createElement("p1");
        statusEl.innerHTML = `Project Status: ${projects[i].status}`;
        projectBoxEl.append(statusEl);

        $("#project-list").append(projectBoxEl);

        $(`#${projects[i].id}-project`).on("click", function () {
          $("#bid-list").empty();
          currentProject.unshift(this.id.charAt(0));
          console.log(this.id.charAt(0));
          getBids();
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const getBids = async () => {
  const response = await fetch(`/api/bid/bids`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const projResponse = await fetch(`/api/project/${currentProject}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const project = await projResponse.json();
  console.log(project);

  const bids = await response.json();
  console.log(bids);

  for (var i = 0; i < bids.length; i++) {
    if (
      bids[i].project_id == currentProject[0] &&
      project.status !== "closed"
    ) {
      var bidBoxEl = document.createElement("div");
      bidBoxEl.className = "bid-box";
      bidBoxEl.setAttribute("id", `${bids[i].id}-bid`);

      var titleEl = document.createElement("h3");
      titleEl.innerHTML = `$${bids[i].bid_amount}`;
      bidBoxEl.append(titleEl);

      var companyEl = document.createElement("h4");
      var bidderInfo = await getBidder(bids[i].user_id);
      companyEl.innerHTML = bidderInfo.company_name;
      bidBoxEl.append(companyEl);

      var emailEl = document.createElement("p1");
      console.log(bids[i].user_id);
      emailEl.innerHTML = await bidderInfo.email;
      bidBoxEl.append(emailEl);

      var approveButtonEl = document.createElement("button");
      approveButtonEl.type = "button";
      approveButtonEl.setAttribute("id", `${bids[i].id}-button`);
      approveButtonEl.setAttribute("class", `approve-button`);
      approveButtonEl.innerHTML = "Approve";
      bidBoxEl.append(approveButtonEl);

      approveButtonEl.addEventListener("click", function () {
        closeProject();
        updateBid(this.id.charAt(0), "approved");
        window.location.reload();
      });

      $("#bid-list").append(bidBoxEl);
    } else if (
      bids[i].project_id == currentProject[0] &&
      project.status == "closed" &&
      bids[i].status !== "approved"
    ) {
      updateBid(bids[i].id, "rejected");
    } else if (
      bids[i].project_id == currentProject[0] &&
      project.status == "closed" &&
      bids[i].status == "approved"
    ) {
      var bidBoxEl = document.createElement("div");
      bidBoxEl.className = "bid-box";
      bidBoxEl.setAttribute("id", `${bids[i].id}-bid`);

      var titleEl = document.createElement("h3");
      titleEl.innerHTML = `$${bids[i].bid_amount}`;
      bidBoxEl.append(titleEl);

      var companyEl = document.createElement("h4");
      var bidderInfo = await getBidder(bids[i].user_id);
      companyEl.innerHTML = bidderInfo.company_name;
      bidBoxEl.append(companyEl);

      var emailEl = document.createElement("p1");
      console.log(bids[i].user_id);
      emailEl.innerHTML = await bidderInfo.email;
      bidBoxEl.append(emailEl);
      $("#bid-list").append(bidBoxEl);
    }
  }
};

const updateBid = async (id, status) => {
  try {
    const response = await fetch(`/api/bid/update/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

const closeProject = async () => {
  var status = "closed";
  try {
    const response = await fetch(`/api/project/update/${currentProject[0]}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

const getBidder = async (user_id) => {
  try {
    const response = await fetch(`/api/user/${user_id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const bidder = await response.json();
    console.log(bidder);
    console.log(bidder.company_name);
    return await bidder;
  } catch (err) {
    console.log(err);
  }
};

function modal() {
  console.log("Modal is working!");
  $("#project-modal").modal("toggle");
}

$("#new-project").on("click", function () {
  modal();
});

const newProject = async (project_name, description) => {
  try {
    const response = await fetch(`/api/project/`, {
      method: "POST",
      body: JSON.stringify({ project_name, description }),
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log(err);
  }
};

$("#create-project").on("click", function (event) {
  var project_name = $("#project-name-input").val();
  var description = $("#project-desc-input").val();
  console.log(project_name);
  console.log(description);

  newProject(project_name, description);
});

$("#logout").on("click", function (event) {
  event.preventDefault();

  const logout = async () => {
    const response = await fetch("/api/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  };

  logout();
});

getBids();
getCurrentUser();
getProjects();
