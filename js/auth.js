// ================= REGISTER =================
function register() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;
  let c = document.getElementById("confirmPassword").value;

  if (p !== c) {
    alert("Passwords do not match");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // prevent duplicate usernames
  if (users.find(user => user.username === u)) {
    alert("Username already exists");
    return;
  }

  users.push({ username: u, password: p });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful");
  location.href = "login.html";
}

// ================= LOGIN =================
function login() {
  let u = document.getElementById("username").value;
  let p = document.getElementById("password").value;

  // ADMIN LOGIN
  let admin = JSON.parse(localStorage.getItem("admin"));
  if (admin && u === admin.username && p === admin.password) {
    localStorage.setItem("loggedIn", "admin");
    location.href = "home.html";
    return;
  }

  // USER LOGIN
  let users = JSON.parse(localStorage.getItem("users")) || [];
  let validUser = users.find(
    user => user.username === u && user.password === p
  );

  if (validUser) {
    localStorage.setItem("loggedIn", u);
    location.href = "home.html";
  } else {
    alert("Invalid username or password");
  }
}
