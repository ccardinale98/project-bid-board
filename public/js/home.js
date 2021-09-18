$("#signup-button").on("click", function (event) {
  event.preventDefault();
  var company_name = $("#username").val();
  var email = $("#email").val();
  var password = $("#password").val();
  var role = $("#role option:selected").val();
  console.log(company_name);
  console.log(email);
  console.log(password);
  console.log(role);
  if (role == "poster") {
    var is_poster = true;
  } else {
    var is_poster = false;
  }

  createUser(company_name, email, password, is_poster);
  window.location.reload();
});

const createUser = async (company_name, email, password, is_poster) => {
  console.log(is_poster);
  try {
    const response = await fetch(`/api/user/create`, {
      method: "POST",
      body: JSON.stringify({ company_name, email, password, is_poster }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response.url);
    window.location = response.url;
  } catch(err) {
    console.log(err)
  }
};

$("#login-button").on("click", function (event) {
  event.preventDefault();

  var email = $("#login-email").val();
  var password = $("#login-password").val();

  loginUser(email, password);
});

const loginUser = async (email, password) => {
  const response = await fetch(`/api/user/login`, {
    method: "POST",
    redirect: "follow",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  console.log(response.url);
  window.location = response.url;
};
